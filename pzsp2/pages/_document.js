// import Document, { Html, Head, Main, NextScript } from 'next/document'

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx)
//     return { ...initialProps }
//   }

//   render() {
//     return (
//       <Html>
//         <Head>
//           {/* Dodaj link do czcionki Inter */}
//             <link rel="preconnect" href="https://fonts.googleapis.com"/>
//             <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
//             <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"/>
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// export default MyDocument

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap"
          rel="stylesheet"
        ></link>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rubik+Glitch&family=Teko&display=swap"
          rel="stylesheet"
        ></link> */}
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Ubuntu&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
