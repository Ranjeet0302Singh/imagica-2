import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";

import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformationType = transformationTypes[type];
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  return (
    <div>
      <Header
        title={transformationType.title}
        subtitle={transformationType.subTitle}
      />

      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformationType.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </div>
  );
};

export default AddTransformationTypePage;
