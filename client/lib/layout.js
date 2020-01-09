import React from "react";

export default ({ children }) => (
  <>
    <div className="antialiased text-gray-900 flex items-center justify-center min-h-screen">
      {children}
      <footer>
        GitHub Repo: <a href="https://github.com/tsoisauce/apollo-graphql-federation">Apollo GraphQL Federation</a>
      </footer>
    </div>
  </>
);