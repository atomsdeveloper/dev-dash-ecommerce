"use client";

// Hooks
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

// Components UI
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../../../components/ui/dialog";
import { MoneyInput } from "./money-inputs";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

// Components
import { ImageUploader } from "./image-uploader";

// Form Validate
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Models
import { CategoriesModel } from "@/model/store/store-model";

// Actions
// import { upsertTransaction } from "../_actions/add-transaction";

type FormSchema = z.infer<typeof formSchema>;
export const formSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome é muito longo"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(500, "A descrição é muito longa"),
  price: z
    .number({ message: "O preço deve ser um número" })
    .positive("O preço deve ser maior que zero"),
  imageUrl: z
    .string()
    .url("A URL da imagem deve ser válida")
    .nonempty("A imagem é obrigatória"),
  ingredients: z
    .array(z.string().min(1, "Ingrediente inválido"))
    .min(1, "Adicione pelo menos um ingrediente"),
  storeId: z.string().uuid("Loja inválida"),
  categoryId: z.string().uuid("Categoria inválida"),
});

interface UperSetTransectionDialogProps {
  isOpen: boolean;
  transactionId?: string;
  setIsOpen: (key: boolean) => void;
}

export default function FormProduct({
  transactionId,
  isOpen,
  setIsOpen,
}: UperSetTransectionDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      ingredients: [],
      storeId: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    console.log("Calling the function onSubmit");
    try {
      // Lógica para salvar os dados aqui
      const res = data;

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const isUpdate = Boolean(transactionId);

  const [data, setData] = useState<CategoriesModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories: CategoriesModel[]) => {
        setData(categories);
        setLoading(false);
      });
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <DialogContent className="overflow-y-scroll scrollbar">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Edit product" : "Criar novo produto"}{" "}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription> Insira as informações abaixo </DialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[65vh]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Dígite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Dígite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Dígite a descrição..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Uploader / IMAGE UPLOAD*/}
            <ImageUploader />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredientes</FormLabel>
                  <FormControl>
                    <Input placeholder="Dígite os ingredientes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loja</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select one Store" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {TRANSACTION_CATEGORY_OPTIONS.map((type) => (
                        <SelectItem key={type.type} value={type.type}>
                          {type.label}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select one Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="py-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => form.reset()}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">{isUpdate ? "Editar" : "Adicionar"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
