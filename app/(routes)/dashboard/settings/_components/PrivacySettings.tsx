import React, { useContext, useState } from "react";
import { AlertTriangle, LogOut, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";

const PrivacySettings = () => {
  const { user } = useContext(TeamContext);
  const [openedMenu, setOpenedMenu] = useState<string | null>(null);
  const [showDeleteAccountWarning, setShowDeleteAccountWarning] =
    useState(false);

  const deleteAllTeams = useMutation(api.teams.deleteAllUserTeams);
  const deleteAllFiles = useMutation(api.files.deleteAllUserFiles);
  const deleteAccount = useMutation(api.user.deleteUserAccount);

  const handleDeleteAllFiles = () => {
    toast.promise(deleteAllFiles({ userEmail: user?.email }), {
      loading: `Deleting all files...`,
      success: () => ({
        message: "Files Deleted",
        description: "All Files deleted successfully!",
      }),
      error: (err) => {
        let cleanMessage =
          err?.message
            ?.split("Uncaught Error: ")[1]
            ?.split("at handler")[0]
            ?.trim() ||
          err?.message?.replace(/\[.*?\]/g, "").trim() ||
          "Something went wrong, please try again.";

        return {
          message: "Failed to Delete All File",
          description: cleanMessage,
        };
      },
    });
  };

  const handleDeleteAllTeams = () => {
    toast.promise(deleteAllTeams({ userEmail: user?.email }), {
      loading: `Deleting all teams...`,
      success: () => ({
        message: "Teams Deleted",
        description: "All Teams deleted successfully!",
      }),
      error: (err) => {
        let cleanMessage =
          err?.message
            ?.split("Uncaught Error: ")[1]
            ?.split("at handler")[0]
            ?.trim() ||
          err?.message?.replace(/\[.*?\]/g, "").trim() ||
          "Something went wrong, please try again.";

        return {
          message: "Failed to Delete All Team",
          description: cleanMessage,
        };
      },
    });
  };

  const handleDeleteAccount = async () => {
    const errorMessages: Record<string, string> = {
      ACCOUNT_NOT_FOUND: "We couldn't find your account. Please try again.",
      USER_NOT_FOUND: "Your account no longer exists.",
      AUTH_FAILED:
        "We encountered an issue processing your request. Please try again later.",
      DELETE_FAILED:
        "We encountered an issue during deletion. Please try again later.",
      NETWORK_ERROR: "Please check your internet connection and try again.",
      TIMEOUT: "The request took too long. Please try again.",
    };

    const toastId = toast.loading("Preparing account deletion...");

    try {
      const result = await deleteAccount({
        userEmail: user?.email!,
        kindeUserId: user?.id!,
      });

      toast.dismiss(toastId);
      toast.success(result.message, {
        description: result.description,
      });

      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      setTimeout(() => {
        window.location.href = "/api/auth/logout";
      }, 1500);
    } catch (err) {
      toast.dismiss(toastId);

      let errorCode = "UNKNOWN_ERROR";
      let userMessage = "Something went wrong. Please try again.";

      if (err instanceof Error) {
        const errorMsg = err.message;

        if (errorMsg.includes("ACCOUNT_NOT_FOUND")) {
          errorCode = "ACCOUNT_NOT_FOUND";
        } else if (errorMsg.includes("USER_NOT_FOUND")) {
          errorCode = "USER_NOT_FOUND";
        } else if (errorMsg.includes("AUTH_FAILED")) {
          errorCode = "AUTH_FAILED";
        } else if (errorMsg.includes("DELETE_FAILED")) {
          errorCode = "DELETE_FAILED";
        } else if (errorMsg.includes("fetch")) {
          errorCode = "NETWORK_ERROR";
        } else if (errorMsg.includes("timeout")) {
          errorCode = "TIMEOUT";
        }
      }

      userMessage = errorMessages[errorCode] || errorMessages["UNKNOWN_ERROR"];

      toast.error("Unable to Delete Account", {
        description: userMessage,
      });

      console.error("Delete account error:", err);
    }
  };

  return (
    <div className="space-y-8 flex flex-col">
      <div>
        <h1 className="text-3xl font-bold mb-1">Privacy & Security</h1>
        <p className="opacity-60 text-sm">
          Manage your privacy settings and security preferences
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold">Data & Privacy</h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-start gap-2">
            <button
              className="border bg-secondary p-1 w-full rounded-md cursor-pointer"
              onClick={() => setOpenedMenu("teams")}
            >
              Delete All teams
            </button>
            <button
              className="border bg-secondary p-1 w-full rounded-md cursor-pointer"
              onClick={() => setOpenedMenu("files")}
            >
              Delete All Files
            </button>
          </div>
          {openedMenu !== null ? (
            openedMenu === "teams" ? (
              <div className="menu-enter flex flex-col gap-4 border-t py-4 mb-3 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-950">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-bold text-base text-red-600 dark:text-red-400">
                    Delete All Teams
                  </h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Deleting all teams is{" "}
                  <span className="font-semibold">
                    permanent and irreversible
                  </span>
                  . Once deleted, you will not be able to recover any of the
                  team's data.
                </p>

                <div className="space-y-2 bg-red-50 dark:bg-red-950/30 rounded-lg p-3 border border-red-200 dark:border-red-900/50">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    The following will be permanently deleted:
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-red-600 dark:text-red-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">All files</span> in each
                        team
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-red-600 dark:text-red-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">
                          All team collaborators
                        </span>{" "}
                        will lose access
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-red-600 dark:text-red-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">
                          All pending invitations
                        </span>{" "}
                        for each team
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-red-600 dark:text-red-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">
                          Team settings and configurations
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Note */}
                <p className="text-xs text-foreground/60 italic">
                  Remember, Only the team owner can delete the team. This action
                  cannot be undone.
                </p>

                {/* Delete Button */}
                <button
                  onClick={handleDeleteAllTeams}
                  className="text-sm cursor-pointer w-full px-4 py-3 bg-red-800/25 hover:bg-red-700 active:bg-red-800 dark:bg-red-700/50 dark:hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Delete Team Permanently
                </button>
              </div>
            ) : (
              <div className="menu-enter flex flex-col gap-4 border-t py-4 mb-3 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950">
                    <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-bold text-base text-orange-600 dark:text-orange-400">
                    Delete All Files
                  </h3>
                </div>

                {/* Warning Message */}
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Deleting all files is{" "}
                  <span className="font-semibold">
                    permanent and irreversible
                  </span>
                  . Once deleted, you will not be able to recover any of your
                  files.
                </p>

                {/* What Gets Deleted */}
                <div className="space-y-2 bg-orange-50 dark:bg-orange-950/30 rounded-lg p-3 border border-orange-200 dark:border-orange-900/50">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    The following will be permanently deleted:
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-orange-600 dark:text-orange-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">All your files</span>{" "}
                        across all teams
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-orange-600 dark:text-orange-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">
                          File content and revisions
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-orange-600 dark:text-orange-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">
                          All file collaborations
                        </span>{" "}
                        and shared access
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-orange-600 dark:text-orange-400 mt-0.5">
                        •
                      </span>
                      <span>
                        <span className="font-medium">
                          File history and metadata
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Note */}
                <p className="text-xs text-foreground/60 italic">
                  This will delete files from all teams created by you. This
                  action cannot be undone.
                </p>

                {/* Delete Button */}
                <button
                  onClick={handleDeleteAllFiles}
                  className="text-sm cursor-pointer w-full px-4 py-3 bg-orange-800/25 hover:bg-orange-700 active:bg-orange-800 dark:bg-orange-700/50 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Delete All Files Permanently
                </button>
              </div>
            )
          ) : null}
        </div>
      </div>

      <div className="hidden border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-red-500 opacity-80">
          <LogOut size={20} />
          Account Management
        </h2>

        <button
          onClick={() => setShowDeleteAccountWarning((prev) => !prev)}
          className="cursor-pointer w-full px-4 py-3 border border-red-500 hover:bg-red-900/15 border-opacity-30 rounded-lg font-medium text-red-500 opacity-80 hover:opacity-100 transition-opacity"
        >
          {!showDeleteAccountWarning
            ? "Delete your Account"
            : "Cancel Account Deletion"}
        </button>

        {showDeleteAccountWarning && (
          <div className="menu-enter flex flex-col gap-4 border-t py-4 mb-3 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-950">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-bold text-base text-red-600 dark:text-red-400">
                Permanent Account Deletion
              </h3>
            </div>

            {/* Warning Message */}
            <p className="text-sm text-foreground/80 leading-relaxed">
              Deleting your account is{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">
                permanent and completely irreversible
              </span>
              . Once deleted, all your data will be gone forever and cannot be
              recovered.
            </p>

            {/* What Gets Deleted - Multiple Sections */}
            <div className="space-y-3 bg-red-50 dark:bg-red-950/30 rounded-lg p-2 md:p-4 border border-red-200 dark:border-red-900/50">
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                Everything will be permanently deleted:
              </p>

              {/* Your Account Section */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  Your Account & Profile
                </p>
                <ul className="space-y-1 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>Your profile and account information</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>All authentication credentials and sessions</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>Your account history and activity logs</span>
                  </li>
                </ul>
              </div>

              {/* Teams Section */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  All Teams You Created
                </p>
                <ul className="space-y-1 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>
                      <span className="font-medium">All teams</span> you own
                      will be deleted
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>Team settings, configurations, and metadata</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>
                      Other team members will{" "}
                      <span className="font-medium">lose access</span>{" "}
                      immediately
                    </span>
                  </li>
                </ul>
              </div>

              {/* Files & Documents Section */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  All Files Data
                </p>
                <ul className="space-y-1 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>
                      <span className="font-medium">All files</span> you created
                      in any team
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>File content, documents, and whiteboards</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>File history, revisions, and edit logs</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>All collaborative changes</span>
                  </li>
                </ul>
              </div>

              {/* Collaborations Section */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  All Collaborations & Invitations
                </p>
                <ul className="space-y-1 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>
                      <span className="font-medium">
                        All pending invitations
                      </span>{" "}
                      you sent will be cancelled
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>
                      <span className="font-medium">
                        All pending invitations
                      </span>{" "}
                      you received will be removed
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>
                      Your membership in other teams will be terminated
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>Your collaboration roles and permissions</span>
                  </li>
                </ul>
              </div>

              {/* Data & Services Section */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  Account Data & Services
                </p>
                <ul className="space-y-1 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>All stored preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>All activity history and usage logs</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    <span>Your account will be removed from our systems</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-3 border border-yellow-200 dark:border-yellow-900/50">
              <p className="text-xs text-foreground/70 flex flex-col md:flex-row text-center md:text-start items-center gap-x-1">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="font-semibold"> Important:</span> You will be
                immediately logged out. If you have any questions or need
                assistance, contact support before proceeding.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-2">
              <button
                onClick={() => setShowDeleteAccountWarning(false)}
                className="text-sm cursor-pointer flex-1 px-4 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground font-semibold rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="text-sm cursor-pointer flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Delete Account permanently
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacySettings;
