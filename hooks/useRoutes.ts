import { Role } from '@prisma/client';
import { usePathname } from 'next/navigation'

export default function useRoutes({
    role,
    length
}: {
    role: Role | undefined,
    length?: number
}) {  
  const pathname = usePathname();
  if(role === 'SalesManager'){
    return [
        {
            title: 'cart',
            link: '/sales-manager/cart',
            icon: '/icons/cart.png',
            length: length,
            active: pathname === "/sales-manager/cart"
        },
        {
            title: 'Home',
            link: '/sales-manager',
            icon: '/icons/home.png',
            active: pathname === "/sales-manager"
        },
        {
            title: 'Parts',
            link: '/sales-manager/parts/manage',
            icon: '/icons/manageparts.png',
            active: pathname === "/sales-manager/parts/manage"
        },
        {
            title: 'Discs',
            link: '/sales-manager/discs/manage',
            icon: '/icons/managediscs.png',
            active: pathname === "/sales-manager/discs/manage"
        },
        {
            title: 'History',
            link: '/sales-manager/sold',
            icon: '/icons/history.png',
            active: pathname === "/sales-manager/sold"
        }
    ]
  }

  if(role === "Manager"){
    return [
        {
            title: 'Home',
            link: '/manager',
            icon: '/icons/home.png',
            active: pathname === "/manager"
        },
        {
            title: 'Parts',
            link: '/manager/parts/add',
            icon: '/icons/addparts.png',
            active: pathname === "/manager/parts/add"
        },
        {
            title: 'Discs',
            link: '/manager/discs/add',
            icon: '/icons/adddiscs.png',
            active: pathname === "/manager/discs/add"
        },
        {
            title: 'Parts',
            link: '/manager/parts/manage',
            icon: '/icons/manageparts.png',
            active: pathname === "/manager/parts/manage"
        },
        {
            title: 'Discs',
            link: '/manager/discs/manage',
            icon: '/icons/managediscs.png',
            active: pathname === "/manager/discs/manage"
        },
    ]
  }

  if(role === "Admin"){
    return [
        {
            title: 'Admin',
            routes: [
                {
                    title: 'Home',
                    link: '/admin',
                    icon: '/icons/home.png',
                    active: pathname === "/admin"
                },
                {
                    title: 'Add Categories',
                    link: '/admin/categories/add',
                    icon: '/icons/addcategories.png',
                    active: pathname === "/admin/categories/add"
                },
                {
                    title: 'Add Categories',
                    link: '/admin/categories/edit',
                    icon: '/icons/editcategories.png',
                    active: pathname === "/admin/categories/edit"
                },
                {
                    title: 'Add Manufacturer',
                    link: '/admin/models/add',
                    icon: '/icons/addmanufacturer.png',
                    active: pathname === "/admin/models/add"
                },
                {
                    title: 'Edit Manufacturer',
                    link: '/admin/models/edit',
                    icon: '/icons/editmanufacturer.png',
                    active: pathname === "/admin/models/edit"
                },
                {
                    title: 'Users',
                    link: '/admin/users',
                    icon: '/icons/users.png',
                    active: pathname === "/admin/users"
                },
                {
                    title: 'History',
                    link: '/admin/sold',
                    icon: '/icons/history.png',
                    active: pathname === "/admin/sold"
                }
            ]
        },
        {
            title: 'Manager',
            routes: [
                {
                    title: 'Home',
                    link: '/manager',
                    icon: '/icons/home.png',
                    active: pathname === "/manager"
                },
                {
                    title: 'Parts',
                    link: '/manager/parts/add',
                    icon: '/icons/addparts.png',
                    active: pathname === "/manager/parts/add"
                },
                {
                    title: 'Discs',
                    link: '/manager/discs/add',
                    icon: '/icons/adddiscs.png',
                    active: pathname === "/manager/discs/add"
                },
                {
                    title: 'Parts',
                    link: '/manager/parts/manage',
                    icon: '/icons/manageparts.png',
                    active: pathname === "/manager/parts/manage"
                },
                {
                    title: 'Discs',
                    link: '/manager/discs/manage',
                    icon: '/icons/managediscs.png',
                    active: pathname === "/manager/discs/manage"
                },
            ]
        },
        {
            title: 'Sales Manager',
            routes: [
                {
                    title: 'cart',
                    link: '/sales-manager/cart',
                    icon: '/icons/cart.png',
                    length: length,
                    active: pathname === "/sales-manager/cart"
                },
                {
                    title: 'Home',
                    link: '/sales-manager',
                    icon: '/icons/home.png',
                    active: pathname === "/sales-manager"
                },
                {
                    title: 'Parts',
                    link: '/sales-manager/parts/manage',
                    icon: '/icons/manageparts.png',
                    active: pathname === "/sales-manager/parts/manage"
                },
                {
                    title: 'Discs',
                    link: '/sales-manager/discs/manage',
                    icon: '/icons/managediscs.png',
                    active: pathname === "/sales-manager/discs/manage"
                },
                {
                    title: 'History',
                    link: '/sales-manager/sold',
                    icon: '/icons/history.png',
                    active: pathname === "/sales-manager/sold"
                }
            ]
        }
    ]
  }

  return null
}
