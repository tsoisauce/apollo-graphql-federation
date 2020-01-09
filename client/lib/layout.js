import React from "react";

export default ({ children }) => (
  <>
    <div className="container mx-auto antialiased text-gray-900 items-center justify-center min-h-screen">
      {children}
    </div>
    <div className="container mx-auto antialiased text-gray-900 flex items-center justify-center text-sm">
        GitHub Repo: <a href="https://github.com/tsoisauce/apollo-graphql-federation">Apollo GraphQL Federation</a>
    </div>
  </>
);