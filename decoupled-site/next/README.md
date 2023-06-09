## Music Festival frontend site Next.js version  

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This sample site use the same Music Festival backend site implemented with Optimizely CMS 12. Please refer to the README file of the backend site project and setup the backend site.  

This sample site demonstrates how the frontend site can be implemented using next.js and deployed to Vercel. This site also demonstrates how the frontend site can integrate with OIDC providers like OptiID, Azure AD, or Optmizely CMS OpenIDConnect server.  

**Note**: on page editing does not work for the Next.js version of the Music Festival frontend site, you can edit the pages using property view in CMS UI instead.  

## Getting Started

First make sure you are running the Music Festival Backend site. Please refer to the README for the backend site.  
Make sure you have run the ContentGraph content synchronization job if you have not already to sync initial data from the backend site to ContentGraph.  

Install dependencies  
```bash
npm install
# or
yarn
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
npm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
