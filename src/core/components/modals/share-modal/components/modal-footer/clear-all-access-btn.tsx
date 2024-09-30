import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextTag } from "@/components/atoms";

function ClearAllAccessBtn({
  isSharing,
  searching,
  handleClearAllAccess,
}: {
  isSharing: boolean;
  searching: boolean;
  handleClearAllAccess: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="error"
          disabled={isSharing || searching}
          className="outline-none sm:w-fit"
        >
          Clear all access
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[250px] flex-col gap-4 p-3 shadow">
        <TextTag className="text-sm text-app_text_grayed">
          This will remove all access permissions to this file
        </TextTag>

        <Button
          variant="error"
          disabled={isSharing || searching}
          onClick={handleClearAllAccess}
          className="outline-none sm:w-full"
        >
          Proceed
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export { ClearAllAccessBtn };
