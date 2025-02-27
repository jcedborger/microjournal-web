export const currentUser = `
    query currentUser {
    currentUser {
      id
      email
      fullName
      userId
      onboarded
      isActive
      avatarUrl
      subscriptions {
        nodes {
          id
          startDate
          endDate
          subscriptionId
          source
          isActive
        }
      }
      userNotificationPreferences {
        nodes {
          id
          enabled
          template {
            id
            enabled
          }
        }
      }
      userEmailPreferences {
        nodes {
          id
          enabled
        }
      }
      userFeatureFlags {
        nodes {
          enabled
          feature {
            id
            slug
            description
            name
          }
        }
      }
    }
  }
`;
