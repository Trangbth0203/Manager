import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Layout } from '~/src/components/layouts/Layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
