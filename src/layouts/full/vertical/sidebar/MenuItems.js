import { uniqueId } from 'lodash';

import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
  IconNotebook,
  IconFileCheck,
  IconChartHistogram,
  IconChartPie2,
  IconChartScatter,
  IconChartPpf,
  IconChartArcs3,
  IconListTree,
  IconLanguage,
  IconFile,
  IconFileText,
} from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/dashboards/admin',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Earning & Revenue',
    icon: IconShoppingCart,
    href: '/admin/earning-revenue',
  },
  {
    id: uniqueId(),
    title: 'Manage Brand',
    icon: IconAppWindow,
    href: '/dashboard/Brand',
    children: [
      {
        id: uniqueId(),
        title: 'Create Brand',
        icon: IconPoint,
        href: '/dashboard/Brand/create',
      },
      {
        id: uniqueId(),
        title: 'Brands List',
        icon: IconPoint,
        href: '/dashboard/brands/list',
      },
    ]
  },

  {
    id: uniqueId(),
    title: 'Category',
    icon: IconPackage,
    chip: '2',
    chipColor: 'secondary',
    // href: '/dashboard/category',
    children: [
      {
        id: uniqueId(),
        title: 'Create Category',
        icon: IconPoint,
        href: '/dashboard/category/create',
      },
      {
        id: uniqueId(),
        title: 'Category List',
        icon: IconPoint,
        href: '/dashboard/category/list',
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Sub Category',
    icon: IconUserCircle,
    href: '/dashboard/sub-category',
    children: [
      {
        id: uniqueId(),
        title: 'Create Sub Category',
        icon: IconPoint,
        href: '/dashboard/sub-category/create',
      },
      {
        id: uniqueId(),
        title: 'Sub Category List',
        icon: IconPoint,
        href: '/dashboard/sub-category/list',
      },
    ]

  },
  {
    id: uniqueId(),
    title: 'Badge',
    icon: IconUserCircle,
    // href: '/admin/manage-widrawa',
    children: [
      {
        id: uniqueId(),
        title: 'Create Badge',
        icon: IconPoint,
        href: '/dashboard/badge/create',
      },
      {
        id: uniqueId(),
        title: 'Badge List',
        icon: IconPoint,
        href: '/dashboard/badge/list',
      },
    ]

  },
  {
    id: uniqueId(),
    title: 'Pricing Groups',
    icon: IconUserCircle,
    href: '/dashboard/pricing-groups',
    children: [
      {
        id: uniqueId(),
        title: 'Create Pricing Group',
        icon: IconPoint,
        href: '/dashboard/pricing-groups/create',
      },
      {
        id: uniqueId(),
        title: 'List Pricing Groups',
        icon: IconPoint,
        href: '/dashboard/pricing-groups/list',
      },
    ]

  },

  {
    id: uniqueId(),
    title: 'Groups Discounts',
    icon: IconChartDonut3,
    href: '/dashboard/pricing-groups-discounts',
    children: [
      {
        id: uniqueId(),
        title: 'Create Discount',
        icon: IconPoint,
        href: '/dashboard/pricing-groups-discounts/create',
      },
      {
        id: uniqueId(),
        title: 'List Discounts',
        icon: IconPoint,
        href: '/dashboard/pricing-groups-discounts/list',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Tax',
    icon: IconBasket,
    href: '/dashboard/tax',
    children: [
      {
        id: uniqueId(),
        title: 'Create Tax',
        icon: IconPoint,
        href: '/dashboard/tax/create',
      },
      {
        id: uniqueId(),
        title: 'Tax List',
        icon: IconPoint,
        href: '/dashboard/tax/list',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Delivery Vendors',
    icon: IconMessage2,
    href: '/dashboard/delivery-vendors',
    children: [
      {
        id: uniqueId(),
        title: 'Create Delivery Vendor',
        icon: IconPoint,
        href: '/dashboard/delivery-vendors/create',
      },
      {
        id: uniqueId(),
        title: 'Delivery Vendor List',
        icon: IconPoint,
        href: '/dashboard/delivery-vendors/list',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Pack Types',
    icon: IconMessage2,
    href: '/dashboard/pack-types',
    children: [
      {
        id: uniqueId(),
        title: 'Create Pack Type',
        icon: IconPoint,
        href: '/dashboard/pack-types/create',
      },
      {
        id: uniqueId(),
        title: 'Pack Type List',
        icon: IconPoint,
        href: '/dashboard/pack-types/list',
      },
    ],
  },


  {
    id: uniqueId(),
    title: 'Products',
    icon: IconNotebook,
    href: '/dashboard/products',
    children: [
      {
        id: uniqueId(),
        title: 'Create Product',
        icon: IconPoint,
        href: '/dashboard/products/create',
      },
      {
        id: uniqueId(),
        title: 'Product List',
        icon: IconPoint,
        href: '/dashboard/products/list',
      },
    ]
  },
  
  {
    id: uniqueId(),
    title: 'Manage Pages',
    icon: IconNotebook,
    href: '/admin/manage-page',
    children: [
      {
        id: uniqueId(),
        title: 'Contact Us',
        icon: IconPoint,
        href: '/admin/contact-us',
      },
      {
        id: uniqueId(),
        title: 'Terms & Conditions',
        icon: IconPoint,
        href: '/admin/page-list',
      },
      {
        id: uniqueId(),
        title: 'Privacy Policy',
        icon: IconPoint,
        href: '/admin/privacy-policy',
      },
      {
        id: uniqueId(),
        title: 'FAQ',
        icon: IconPoint,
        href: '/admin/faq',
      },
      {
        id: uniqueId(),
        title: 'Custom Page',
        icon: IconPoint,
        href: '/admin/custom-page',
      }
    ]
  },
  {
    id: uniqueId(),
    title: 'Manage Content',
    icon: IconNotebook,
    href: '/admin/manage-payment',
    children: [
      {
        id: uniqueId(),
        title: 'Frontend Section',
        icon: IconPoint,
        href: '/admin/frontend-section',
      },
      {
        id: uniqueId(),
        title: 'Footer Info',
        icon: IconPoint,
        href: '/admin/footer-info',
      },
      {
        id: uniqueId(),
        title: 'Testimonial',
        icon: IconPoint,
        href: '/admin/testimonial',
      },
      {
        id: uniqueId(),
        title: 'Partner',
        icon: IconPoint,
        href: '/admin/partner',
      },
    ]
  },

  {
    navlabel: true,
    subheader: 'Setting And Configuration',
  },
  {
    id: uniqueId(),
    title: 'Settings',
    icon: IconSettings,
    href: '/admin/setting',
  },
  {
    id: uniqueId(),
    title: 'Multi Currency',
    icon: IconSettings,
    href: '/admin/multi-currency',
  },
  {
    id: uniqueId(),
    title: 'Language',
    icon: IconLanguage,
    href: '/admin/language',
    children: [
      {
        id: uniqueId(),
        title: 'Languages',
        icon: IconPoint,
        href: '/admin/languags',
      },
      {
        id: uniqueId(),
        title: 'Theme Languages',
        icon: IconPoint,
        href: '/admin/theme-languages',
      }
    ]
  },
  {
    id: uniqueId(),
    title: 'Email Configuration',
    icon: IconSettings,
    href: '/admin/social-media',
    children: [
      {
        id: uniqueId(),
        title: 'Configuration',
        icon: IconPoint,
        href: '/admin/configuration',
      },
      {
        id: uniqueId(),
        title: 'Email Template',
        icon: IconPoint,
        href: '/admin/email-template',
      }
    ]
  },
  {
    id: uniqueId(),
    title: 'SEO Setup',
    icon: IconSettings,
    href: '/admin/seo-setup',
  },
  {
    id: uniqueId(),
    title: 'Payment Method',
    icon: IconSettings,
    href: '/admin/payment-method',
  },

  {
    label: true,
    subheader: 'Others',
  },
  {
    id: uniqueId(),
    title: 'News Letter',
    icon: IconFileText,
    href: '/admin/news-letter',
    children: [
      {
        id: uniqueId(),
        title: 'Subscriber List',
        icon: IconPoint,
        href: '/admin/subscriber-list',
      },
      {
        id: uniqueId(),
        title: 'Send Mail',
        icon: IconPoint,
        href: '/admin/send-mail',
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Cache Clear',
    icon: IconFileText,
    href: '/admin/cache-clear',
  },
  {
    id: uniqueId(),
    title: 'Logout',
    icon: IconFileText,
    href: '/admin/logout',
  },

];

export default Menuitems;
