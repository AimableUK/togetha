import React, { useContext, useState } from "react";
import { LogOut } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";
import { DeleteData } from "../../files/FileList";
import PermanentDelete from "./PermanentDelete";

const PrivacySettings = () => {
  const { user } = useContext(TeamContext);

  const deleteAllTeams = useMutation(api.teams.deleteAllUserTeams);
  const deleteAllFiles = useMutation(api.files.deleteAllUserFiles);
  const deleteAccount = useMutation(api.user.deleteUserAccount);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>();

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
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted."
    );

    if (!confirmed) return;

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
        window.location.href = "/";
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
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Privacy & Security</h1>
          <p className="opacity-60 text-sm">
            Manage your privacy settings and security preferences
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">Data & Privacy</h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-start menu-center gap-2">
              <button
                className="border bg-secondary p-1 w-full rounded-md cursor-pointer"
                onClick={handleDeleteAllTeams}
              >
                Delete All teams
              </button>
              <button
                className="border bg-secondary p-1 w-full rounded-md cursor-pointer"
                onClick={handleDeleteAllFiles}
              >
                Delete All Files
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-red-500 opacity-80">
            <LogOut size={20} />
            Account Management
          </h2>

          <button
            onClick={handleDeleteAccount}
            className="cursor-pointer w-full px-4 py-3 border border-red-500 hover:bg-red-900/15 border-opacity-30 rounded-lg font-medium text-red-500 opacity-80 hover:opacity-100 transition-opacity"
          >
            Delete your Account
          </button>
        </div>
      </div>
      {openDialog && deleteData && (
        <PermanentDelete
          id={deleteData?.id!}
          type={deleteData?.type!}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      )}
    </>
  );
};

export default PrivacySettings;
