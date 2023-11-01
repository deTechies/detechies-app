import { z } from "zod";

export const careerDataSchema = z.object({
    personalSkills: z.array(z.string()).optional(),
    location: z.string().optional(),
    currentRole: z.string().optional(),
    expectedSalary: z.string().optional(),
    lookingFor: z.string().optional(),
    educationalBackground: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        yearCompleted: z.string(),
      })
    ).optional(),
    workExperience: z.array(
      z.object({
        company: z.string(),
        role: z.string(),
        yearsWorked: z.string(),
        achievements: z.array(z.string()).optional(),
      })
    ).optional(),
  });
  
  export type CareerDataValues = z.infer<typeof careerDataSchema>;
  
  // You can now use CareerDataValues as a type, and careerDataSchema as a validation schema.
  