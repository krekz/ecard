"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { deleteDesign } from "../../../../actions/admin/design-actions";
import DeleteButton from "@/components/delete-button";

// Designs table
export type Design = {
  designId: string;
  category: string;
  name: string;
  front_design_url: string;
  thumbnail_url: string;
};

export const designColumns: ColumnDef<Design>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "thumbnail_url",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnail_url = row.original.thumbnail_url;
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${thumbnail_url}`}
          alt="thumbnail"
          width={250}
          height={250}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const designId = row.original.designId;
      return <DesignActionsCell designId={designId as string} />;
    },
  },
];

const DesignActionsCell: React.FC<{ designId: string }> = ({ designId }) => {
  const { toast } = useToast();

  return (
    <div className="flex gap-2">
      <Button variant="outline">
        <Link href={`/admin/designs/update?&designId=${designId}`}>
          Edit
        </Link>
      </Button>
      <DeleteButton
        onSubmit={async () => {
          const formData = new FormData();
          formData.append("designId", designId);
          try {
            const response = await deleteDesign(formData);
            if (response.ok) {
              toast({
                title: response.message,
                variant: "success",
              });
            } else {
              toast({
                title: response.message,
                variant: "destructive",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Users who created their card with this design will be deleted as well
      </DeleteButton>
    </div>
  );
};
