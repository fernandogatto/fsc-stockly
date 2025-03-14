import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface AlertDeleteSaleDialogContentProps {
  saleId: string;
}

const AlertDeleteSaleDialogContent = ({
  saleId,
}: AlertDeleteSaleDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluída com sucesso.");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir a venda.");
    },
  });

  const handleContinueClick = () => {
    executeDeleteSale({ id: saleId });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prester a excluir esta venda. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertDeleteSaleDialogContent;
