"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentContainer,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogHeaderContainer,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createInvoiceItemSchema, ZodCreateInvoiceSchema } from "@/zod-schemas/invoice/create-invoice";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { BoxIcon, BoxPlusIcon, TrashIcon } from "@/assets/icons";
import { FormInput } from "@/components/ui/form/form-input";
import { formatCurrencyText } from "@/constants/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import FormRow from "@/components/ui/form/form-row";
import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface InvoiceItemsSectionProps {
  form: UseFormReturn<ZodCreateInvoiceSchema>;
}

type InvoiceItem = ZodCreateInvoiceSchema["items"][number];

const InvoiceItemsSection: React.FC<InvoiceItemsSectionProps> = ({ form }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const invoiceItemForm = useForm<InvoiceItem>({
    resolver: zodResolver(createInvoiceItemSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 1,
    },
  });

  const onAddItem = (data: InvoiceItem) => {
    append(data);
    // clear the values for next item
    invoiceItemForm.reset();
    // close the dialog
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Rendering the items */}
      {fields.length > 0 && (
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div className="bg-muted flex w-full flex-row justify-between gap-2 rounded-md p-3" key={field.id}>
              <div className="flex w-full flex-row gap-2">
                <div className="bg-muted-foreground/20 grid aspect-square h-full place-items-center rounded-md">
                  <BoxIcon />
                </div>
                <div className="w-full">
                  <div className="line-clamp-1 text-sm font-medium">{field.name}</div>
                  <div className="text-muted-foreground line-clamp-1 text-xs">{field.description}</div>
                  <div className="text-primary text-[10px] font-medium">
                    {formatCurrencyText(form.watch("invoiceDetails.currency"), field.unitPrice)}{" "}
                    <span className="text-muted-foreground">x {field.quantity} Qty</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col items-end justify-between">
                  <Button
                    className="h-5.5 w-5.5 rounded"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="size-3" />
                  </Button>
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-muted-foreground text-[10px] whitespace-nowrap">
                      Total :{" "}
                      {formatCurrencyText(form.watch("invoiceDetails.currency"), field.unitPrice * field.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Dialog for adding a new item */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="w-full border-dashed" variant="outline">
            <BoxPlusIcon />
            Add Item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...invoiceItemForm}>
            <form onSubmit={invoiceItemForm.handleSubmit(onAddItem)}>
              <DialogHeaderContainer>
                <DialogIcon>
                  <BoxPlusIcon />
                </DialogIcon>
                <DialogHeader>
                  <DialogTitle>Add Item</DialogTitle>
                  <DialogDescription>Add an item to the invoice</DialogDescription>
                </DialogHeader>
              </DialogHeaderContainer>
              <DialogContentContainer>
                <FormInput label="Item Name" name="name" placeholder="Item Name" reactform={invoiceItemForm} />
                <FormInput
                  label="Item Description"
                  name="description"
                  placeholder="Item Description"
                  reactform={invoiceItemForm}
                />
                <FormRow>
                  <FormInput
                    type="number"
                    label="Quantity"
                    name="quantity"
                    placeholder="Quantity"
                    reactform={invoiceItemForm}
                  />
                  <FormInput
                    type="number"
                    label="Unit Price"
                    name="unitPrice"
                    placeholder="Unit Price"
                    reactform={invoiceItemForm}
                  />
                </FormRow>
              </DialogContentContainer>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceItemsSection;
