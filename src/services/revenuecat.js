import { Purchases } from "@revenuecat/purchases-js";

const API_KEY = "rcb_sb_CoMUazIGEFQoOEmAOJPYusvrw";

function getOrCreateAppUserId() {
  if (typeof window === "undefined") return null; // Ensure it runs only in the browser

  let userId = localStorage.getItem("revenuecat_user_id");

  if (!userId) {
    userId = `anon_${crypto.randomUUID()}`;
    localStorage.setItem("revenuecat_user_id", userId);
  }

  return userId;
}

export function initializeRevenueCat() {
  const appUserId = Purchases.generateRevenueCatAnonymousAppUserId();
  Purchases.configure(API_KEY, appUserId);
}

export async function fetchOfferings() {
  try {
    initializeRevenueCat(); // Ensure initialization before fetching
    const offerings = await Purchases.getSharedInstance().getOfferings();
    return offerings.current.availablePackages;
  } catch (e) {
    console.error("Error fetching offerings:", e);
    return [];
  }
}

export async function purchase(offerId) {
  try {
    const offerings = await fetchOfferings();
    const offer = offerings.find((o) => o.identifier === offerId);
    try {
      const { customerInfo } = await Purchases.getSharedInstance().purchase({
        rcPackage: offer,
      });
      console.log("Purchase successful:", customerInfo);
    } catch (e) {
      if (
        e instanceof PurchasesError &&
        e.errorCode == ErrorCode.UserCancelledError
      ) {
        // User cancelled the purchase process, don't do anything
      } else {
        // Handle errors
      }
    }
  } catch (error) {
    console.error("Purchase failed:", error);
  }
}
