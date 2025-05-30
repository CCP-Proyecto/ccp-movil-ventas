import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

import { CLOUD_ENDPOINTS } from "@/constants";

export const authClient = createAuthClient({
  baseURL: CLOUD_ENDPOINTS.USERS_MS,
  plugins: [
    expoClient({
      scheme: "ccp-sales",
      storagePrefix: "ccp-sales",
      storage: SecureStore,
    }),
    inferAdditionalFields({
      user: {
        userId: {
          type: "string",
        },
        roles: {
          type: "string[]",
        },
        phone: {
          type: "string",
        },
        address: {
          type: "string",
        },
        idType: {
          type: "string",
        },
        idNumber: {
          type: "string",
        },
        acceptTerms: {
          type: "boolean",
        },
        acceptInfo: {
          type: "boolean",
        },
      },
    }),
  ],
});
