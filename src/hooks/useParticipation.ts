import { useAuth } from "reactfire";
import { useDugnadRef, useDugnad } from "./useDugnad";

export const useParticipation = (dugnadId: string) => {
  const userId = useAuth().currentUser?.uid;
  const currentDugnad = useDugnad(dugnadId);
  const currentDugnadRef = useDugnadRef(dugnadId);

  const isParticipatingInDugnad = currentDugnad.participants?.includes(userId!);

  const participate = () =>
    currentDugnadRef.update({
      participants: Array.from(
        new Set([...(currentDugnad.participants || []), userId])
      ),
    });

  const toggleParticipation = () => {
    if (isParticipatingInDugnad) {
      currentDugnadRef.update({
        participants: currentDugnad?.participants?.filter(
          (id) => id !== userId
        ),
      });
    } else {
      participate();
    }
  };
  return {
    isParticipatingInDugnad,
    toggleParticipation,
    participate,
  };
};
