import { useState } from "react";
import { FloatingChatButton } from "./FloatingChatButton";
import { FloatingChatModal } from "./FloatingChatModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isShowcaseMode } from "@/lib/showcaseMode";

/**
 * Global “Ask AI” entry: fixed button on (almost) all routes.
 * Showcase builds use a lightweight dialog so we do not call chat APIs without auth.
 */
export const FloatingChatWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FloatingChatButton onClick={() => setIsModalOpen(true)} />
      {isShowcaseMode() ? (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ask AI</DialogTitle>
              <DialogDescription className="text-left leading-relaxed">
                This preview uses demo data. Connect the full app with sign-in to use live
                Accounting AI chat, reports, and integrations.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <FloatingChatModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          conversationId={null}
        />
      )}
    </>
  );
};
