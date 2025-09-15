import z from "zod";

export const PackMetadataSchema = z.object({
    name: z.string().min(1),
    author: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    version: z.string().min(1),
});

export type PackMetadata = z.infer<typeof PackMetadataSchema>;