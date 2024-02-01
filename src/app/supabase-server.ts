import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

// export async function getSession() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     return session;
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// }

// export async function getUserDetails() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const { data: userDetails } = await supabase
//       .from("users")
//       .select("*")
//       .single();
//     return userDetails;
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// }

export const getQuestions = async () => {
  const supabase = createServerSupabaseClient();
  let { data: level1, error: level1Error } = await supabase
    .from("grade7_math_data")
    .select("*")
    .in("blooms_level", ["Knowing", "Understanding"])
    .limit(4);

  let { data: level2, error: level2Error } = await supabase
    .from("grade7_math_data")
    .select("*")
    .in("blooms_level", ["Analyzing", "Applying"])
    .limit(3);

  let { data: level3, error: level3Error } = await supabase
    .from("grade7_math_data")
    .select("*")
    .in("blooms_level", ["Evaluating", "Creating"])
    .limit(3);

  if (level1Error || level2Error || level3Error) {
    console.log(level1Error || level2Error || level3Error);
  }

  // Shuffles the questions array
  function shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  return shuffle(
    [...(level1 ?? []), ...(level2 ?? []), ...(level3 ?? [])] ?? []
  );
};
