import React from 'react';
import Link from 'next/link';

export type BreadcrumbItemProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
};

const BreadcrumbItem = ({
  href = '#',
  className,
  children,
}: BreadcrumbItemProps) => (
  <Link
    href={href}
    role="button"
    className={`inline-flex items-center gap-2 text-sm ${className}`}
  >
    {children}
  </Link>
);

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
  disableCurrent?: boolean;
  children: React.ReactNode;
  className?: string;
  separatorClassName?: string;
  separatorVariant?: 'default' | 'circle';
}

const Breadcrumb = ({
  separator = '/',
  disableCurrent = true,
  children,
  className,
  separatorClassName,
  separatorVariant = 'default',
}: BreadcrumbProps) => {
  const numOfItems = React.Children.count(children);

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<BreadcrumbItemProps>(child)) return child;

        return (
          <>
            {React.cloneElement(child, {
              className: `${
                child.props.className || ''
              } text-gray-700 last:text-gray-500 font-semibold text-md ${
                disableCurrent && 'last:pointer-events-none'
              }`,
            })}
            {index < numOfItems - 1 &&
              (separatorVariant === 'default' ? (
                <span
                  className={`text-md font-bold text-gray-900 ${separatorClassName}`}
                >
                  {separator}
                </span>
              ) : (
                <span className="h-1 w-1 rounded-full bg-gray-300" />
              ))}
          </>
        );
      })}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
