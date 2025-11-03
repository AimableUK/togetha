"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  BookUser,
  Check,
  FilePlus,
  LoaderCircleIcon,
  Rocket,
  UserPlus,
} from "lucide-react";
// guide
import StepTeamSetup from "./_components/steps/guide/StepTeamSetUp";
import StepCreateFile from "./_components/steps/guide/StepCreateFile";
import StepInviteMembers from "./_components/steps/guide/StepInviteMembers";
import StepCollaborate from "./_components/steps/guide/StepCollaborate";

// obboarding
import StepTeamSetupReal from "./_components/steps/onboarding/StepTeamSetup";
import StepCreateFileReal from "./_components/steps/onboarding/StepCreateFile";
import StepInviteMembersReal from "./_components/steps/onboarding/StepInviteMembers";
import StepCollaborateReal from "./_components/steps/onboarding/StepCollaborate";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  { title: "Team SetUp", icon: BookUser },
  { title: "Create File", icon: FilePlus },
  { title: "Invite Members", icon: UserPlus },
  { title: "Collaborate", icon: Rocket },
];

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "guide";
  const isGuide = mode === "guide";

  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-[calc(100vh-112px)] md:my-14 m-5 md:mx-20">
      <Stepper
        value={currentStep}
        onValueChange={setCurrentStep}
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
        className="space-y-2 flex flex-1 flex-col justify-between h-full"
      >
        <StepperNav className="gap-3 flex items-center">
          {steps.map((step, index) => {
            return (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative items-center"
              >
                <StepperTrigger
                  className="flex flex-col items-start justify-center gap-2.5 grow"
                  asChild
                >
                  <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-green-accent data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                    <step.icon className="size-4" />
                  </StepperIndicator>
                  <div className="flex flex-col items-start gap-1">
                    <StepperTitle className="hidden md:block text-start text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                      {step.title}
                    </StepperTitle>
                    <div className="hidden md:flex">
                      <Badge
                        variant="outline"
                        className="hidden group-data-[state=active]/step:inline-flex"
                      >
                        In Progress
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="hidden group-data-[state=completed]/step:inline-flex"
                      >
                        Completed
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground"
                      >
                        Pending
                      </Badge>
                    </div>
                  </div>
                </StepperTrigger>

                {steps.length > index + 1 && (
                  <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-accent" />
                )}
              </StepperItem>
            );
          })}
        </StepperNav>

        <StepperPanel className="text-sm flex-1">
          <StepperContent value={1}>
            {isGuide ? <StepTeamSetup /> : <StepTeamSetupReal />}
          </StepperContent>

          <StepperContent value={2}>
            {isGuide ? <StepCreateFile /> : <StepCreateFileReal />}
          </StepperContent>

          <StepperContent value={3}>
            {isGuide ? <StepInviteMembers /> : <StepInviteMembersReal />}
          </StepperContent>

          <StepperContent value={4}>
            {isGuide ? <StepCollaborate /> : <StepCollaborateReal />}
          </StepperContent>
        </StepperPanel>

        <div className="flex items-center justify-between gap-2.5 mt-4 mb-2 md:mb-0">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
            className="cursor-pointer"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            className="cursor-pointer"
          >
            {currentStep === steps.length ? "Go to Dashboard" : "Next"}
          </Button>
        </div>
      </Stepper>
    </div>
  );
};

export default GetStarted;
