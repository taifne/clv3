import React from 'react';
import Breadcrumb from '@/components/BreadCrum/BreadCrum';

interface BreadcrumbsProps {
  url: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ url }) => {
  const pathSegments = url.split('/').filter(Boolean);

  const generateBreadcrumb = () => {
    let breadcrumbs = [];
    let path = '';
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      path += `/${segment}`;
      const isLast = i === pathSegments.length - 1;
      breadcrumbs.push(
        <Breadcrumb.Item key={segment} href={path}>
          {isLast ? segment : segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Breadcrumb.Item>
      );
    }
    return breadcrumbs;
  };

  return (
    <Breadcrumb separator=">" className="text-lg">
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {generateBreadcrumb()}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
