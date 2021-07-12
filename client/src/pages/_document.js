import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* <meta name='image' content='/banner.png' /> */}
          <meta property='og:title' content='Felicity Twitter' />
          <meta
            name='description'
            content='Hasib is a passionate self-taught Full Stack web developer from Bangladesh who develop web applications, mobile applications and desktop applications.'
          />
          <meta
            property='og:description'
            content='Hasib is a passionate self-taught Full Stack web developer from Bangladesh who develop web applications, mobile applications and desktop applications.'
          />
          {/* <meta property='og:image' content='/banner.png' /> */}
          <meta property='og:url' content='https://muttakinhasib.github.io/' />
          <meta property='og:type' content='website' />

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:creator' content='@MuttakinHasib' />
          <meta name='twitter:title' content='Felicity Twitter' />
          <meta
            name='twitter:description'
            content='Hasib is a passionate self-taught Full Stack web developer from Bangladesh who develop web applications, mobile applications and desktop applications '
          />
          {/* <meta name='twitter:image' content='/banner.png' /> */}

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
