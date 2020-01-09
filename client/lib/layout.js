import React from "react";

export default ({ children }) => (
  <>
    <nav>
      <a href="/">Apollo Federation</a> | <a href="/all-orders">All Orders</a> | <a href="/all-reviews">All Reviews</a> | <a href="/info-reviews">Reviews Info</a>
    </nav>
    <div className="container mx-auto antialiased text-gray-900 items-center justify-center min-h-screen">
      {children}
    </div>
    <div className="container mx-auto antialiased text-gray-900 flex items-center justify-center text-sm">
        GitHub Repo: <a href="https://github.com/tsoisauce/apollo-graphql-federation">Apollo GraphQL Federation</a>
    </div>
  </>
);