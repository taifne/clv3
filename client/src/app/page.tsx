// pages/index.tsx
import Card from '@/components/Card';
import Layout from '@/components/Layout';
  
const Home: React.FC = () => {
  return (
    <Layout>
      <div className="text-center">
 
        <div className="m-8 p-2 flex flex-wrap flex-row justify-start items-center min-h-80  rounded-md h-fit" >
          <Card title="HTML-CSS-JS" description="CLT Landingpage !" href="/landingpage" />
          <Card title="NestJs" description="Restful API !" href="/rest-api" />
        </div>
      </div>
    </Layout>
  );
}


export default Home;
