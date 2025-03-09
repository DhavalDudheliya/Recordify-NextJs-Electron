import { SUBSCRIPTION_PLANS, WORKSPACE_TYPES } from "@/constants/enums";

export interface WorkspaceProps {
  data: {
    subscription: {
      plan: SUBSCRIPTION_PLANS;
    } | null;
    workspace: {
      id: string;
      name: string;
      type: WORKSPACE_TYPES;
    }[];
    members: {
      Workspace: {
        id: string;
        name: string;
        type: WORKSPACE_TYPES;
      };
    }[];
  };
}
