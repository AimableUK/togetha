"use client";

import { TeamContext } from "@/app/FilesListContext";
import { validateName } from "@/app/Schema/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function StepCreateFile() {
  const [fileInput, setFileInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const { activeTeam_ } = useContext(TeamContext);

  const onFileCreate = async () => {
    const error = validateName(fileInput);
    if (error) {
      setErrorMsg(error);
      return;
    }

    const promise = createFile({
      fileName: fileInput,
      teamId: activeTeam_?._id!,
      createdBy: user?.email!,
      archieve: false,
      document: "",
      whiteboard: "",
    });

    toast.promise(promise, {
      loading: "Creating...",
      success: () => ({
        message: "File Created",
        description: `${fileInput} created!, Click Next to Continue.`,
      }),
      error: (error) => ({
        message: "Error",
        description:
          error?.response?.data?.detail ||
          "Failed to Create file, Please Try again later.",
      }),
    });
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full text-center space-y-4 mt-1 md:mt-4">
      <h2 className="text-lg font-semibold">Create Your First File</h2>
      <p className="text-sm text-muted-foreground">
        Start your first project file to begin working on ideas.
      </p>
      <div className="flex-1 gap-2 flex flex-col items-center">
        <Label htmlFor="fileName" className="sr-only">
          Link
        </Label>
        <Input
          id="fileName"
          placeholder="Enter File Name"
          className="mt-2"
          onChange={(e) => setFileInput(e.target.value)}
        />
        {errorMsg && (
          <p className="text-red-300 font-semibold text-sm">{errorMsg}</p>
        )}
        <Button
          type="submit"
          className="mt-3 w-fit flex bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/80 dark:text-foreground/90 cursor-pointer trans"
          disabled={!(fileInput && fileInput.length > 2)}
          onClick={onFileCreate}
        >
          Create File
        </Button>
      </div>
    </div>
  );
}
