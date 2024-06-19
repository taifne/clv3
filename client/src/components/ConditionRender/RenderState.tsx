"use client"
import React, { FC, ReactNode } from "react";
import Rendering from "@/components/ConditionRender/ConditionRendering"; 
import LoadingAnimation from "../Loading/Loading";

type RenderStateProps = {
    loading: boolean;
    success: boolean;
    error: boolean;
    children:ReactNode
  };
  
  const RenderState: FC<RenderStateProps> = ({ loading, success, error, children }) => {
    return (
      <Rendering.Conditional>
        <Rendering.When isTrue={loading}>
        <LoadingAnimation />
        </Rendering.When>
        <Rendering.When isTrue={success}>{children}</Rendering.When>
        <Rendering.When isTrue={error}>
          <p>Error...</p>
        </Rendering.When>
      </Rendering.Conditional>
    );
  }
  
  export default RenderState;