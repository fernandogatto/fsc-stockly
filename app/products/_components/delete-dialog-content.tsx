import { deleteProduct } from "@/app/_actions/product/delete-product";
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

interface AlertDeleteProductDialogContentProps {
  productId: string;
}

const AlertDeleteProductDialogContent = ({
  productId,
}: AlertDeleteProductDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto excluído com sucesso.");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o produto.");
    },
  });

  const handleContinueClick = () => {
    executeDeleteProduct({ id: productId });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prester a excluir este produto. Deseja continuar?
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

export default AlertDeleteProductDialogContent;
