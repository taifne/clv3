// pages/index.tsx
import Card from '@/components/Card';
import Layout from '@/components/Layout';
  
const Home: React.FC = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App</h1>
        <p className="text-lg">This is a simple homepage created using Next.js and Tailwind CSS.</p>
        <div className="m-8 p-2 flex flex-wrap flex-row justify-start items-center min-h-80  rounded-md h-fit" >
         
          <Card title="NestJs" description="Comment Table !" href="/rest-api/posts" />
        </div>
      </div>
    </Layout>
  );
}


export default Home;
