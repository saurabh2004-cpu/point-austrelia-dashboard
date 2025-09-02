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
        title: 'Category List',
        icon: IconPoint,
        href: '/admin/category-list',
      },
      {
        id: uniqueId(),
        title: 'Create Course',
        icon: IconPoint,
        href: '/admin/create-course',
      },
      {
        id: uniqueId(),
        title: 'Course List',
        icon: IconPoint,
        href: '/admin/course-list',
      },
      {
        id: uniqueId(),
        title: 'Pending Course',
        icon: IconPoint,
        href: '/admin/pending-course',
      }
    ]
  },

  {
    id: uniqueId(),
    title: 'Enrollment',
    icon: IconPackage,
    chip: '2',
    chipColor: 'secondary',
    href: '/admin/enrollment',
    children: [
      {
        id: uniqueId(),
        title: 'enrollment list',
        icon: IconPoint,
        href: '/admin/enrollment-list',
      },
      {
        id: uniqueId(),
        title: 'pending payment',
        icon: IconPoint,
        href: '/admin/pending-payment/1',
      },
      {
        id: uniqueId(),
        title: 'rejected payment',
        icon: IconPoint,
        href: '/admin/rejected-payment/1',
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Manage Coupen',
    icon: IconUserCircle,
    href: '/admin/manage-coupen',
    children: [
      {
        id: uniqueId(),
        title: 'Coupen List',
        icon: IconPoint,
        href: '/admin/coupen-list',
      },
      {
        id: uniqueId(),
        title: 'Coupen log',
        icon: IconPoint,
        href: '/admin/coupen-log',
      },
    ]

  },
  {
    id: uniqueId(),
    title: 'Manage Widrawa',
    icon: IconUserCircle,
    href: '/admin/manage-widrawa',
    children: [
      {
        id: uniqueId(),
        title: 'withdraw Method',
        icon: IconPoint,
        href: '/admin/withdraw-method',
      },
      {
        id: uniqueId(),
        title: 'Withdraw List',
        icon: IconPoint,
        href: '/admin/withdraw-list',
      },
    ]

  },
  {
    id: uniqueId(),
    title: 'Manage Instructor',
    icon: IconUserCircle,
    href: '/admin/manage-widrawa',
    children: [
      {
        id: uniqueId(),
        title: 'Instructor List',
        icon: IconPoint,
        href: '/admin/instructor-list',
      },
      {
        id: uniqueId(),
        title: 'Join Request',
        icon: IconPoint,
        href: '/admin/join-request',
      },
    ]

  },

  {
    id: uniqueId(),
    title: 'Manage-student',
    icon: IconChartDonut3,
    href: '/admin/manage-student/',
    children: [
      {
        id: uniqueId(),
        title: 'Student List',
        icon: IconPoint,
        href: '/admin/student-list',
      },
      {
        id: uniqueId(),
        title: 'Pending Student',
        icon: IconPoint,
        href: '/admin/pending-student',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Contact Message',
    icon: IconBasket,
    href: '/admin/contact-message',

  },
  {
    id: uniqueId(),
    title: 'Support Ticket',
    icon: IconMessage2,
    href: '/admin/support-ticket',
  },

  {
    navlabel: true,
    subheader: 'CMS & Blogs',
  },
  {
    id: uniqueId(),
    title: 'Manage Blogs',
    icon: IconNotebook,
    href: '/admin/manage-blogs',
    children: [
      {
        id: uniqueId(),
        title: 'Create Category',
        icon: IconPoint,
        href: '/admin/create-category',
      },
      {
        id: uniqueId(),
        title: 'Category List',
        icon: IconPoint,
        href: '/admin/blog-category',
      },
      {
        id: uniqueId(),
        title: 'Create Blog',
        icon: IconPoint,
        href: '/admin/create-blog',
      },
      {
        id: uniqueId(),
        title: 'Blog List',
        icon: IconPoint,
        href: '/admin/blog-list',
      }
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
