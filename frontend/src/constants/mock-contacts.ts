import { Contact } from '../services/contacts/contacts.service';

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    funnel_stage: "lead",
    tags: "Enterprise, High-Value",
    notes: "Interested in our API integration capabilities.",
    created_at: "2024-03-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Sofia Martinez",
    email: "sofia.m@startup.io",
    phone: "+1 (555) 987-6543",
    status: "Active",
    funnel_stage: "following_up",
    tags: "SaaS, Early Stage",
    notes: "Requested a demo for the sales team.",
    created_at: "2024-03-16T11:30:00Z"
  },
  {
    id: 3,
    name: "Jordan Smith",
    email: "jordan.smith@global.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    funnel_stage: "client",
    tags: "Contract Signed",
    notes: "Onboarding scheduled for next week.",
    created_at: "2024-03-10T09:00:00Z"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "elena.r@fintech.es",
    phone: "+34 600 123 456",
    status: "Active",
    funnel_stage: "lead",
    tags: "Europe, Finance",
    notes: "Met at the Madrid Tech Conference.",
    created_at: "2024-03-18T14:20:00Z"
  },
  {
    id: 5,
    name: "Marcus Chen",
    email: "m.chen@ai-solutions.co",
    phone: "+1 (555) 222-3333",
    status: "Warm",
    funnel_stage: "following_up",
    tags: "AI, Strategic",
    notes: "Reviewing the security documentation.",
    created_at: "2024-03-17T16:45:00Z"
  },
  {
    id: 6,
    name: "Isabella Dubois",
    email: "i.dubois@luxury.fr",
    phone: "+33 1 23 45 67 89",
    status: "Active",
    funnel_stage: "client",
    tags: "VIP, Retail",
    notes: "Looking to expand their license count.",
    created_at: "2024-03-05T08:15:00Z"
  },
  {
    id: 7,
    name: "Liam O'Connor",
    email: "liam@dublindata.ie",
    phone: "+353 1 555 7890",
    status: "Cold",
    funnel_stage: "lead",
    tags: "Data Centers",
    notes: "Initial outreach sent, waiting for reply.",
    created_at: "2024-03-19T12:00:00Z"
  },
  {
    id: 8,
    name: "Yuki Tanaka",
    email: "y.tanaka@japan-tech.jp",
    phone: "+81 3-1234-5678",
    status: "Active",
    funnel_stage: "following_up",
    tags: "APAC, Manufacturing",
    notes: "Requires local support in Tokyo.",
    created_at: "2024-03-14T23:30:00Z"
  },
  {
    id: 9,
    name: "David Wilson",
    email: "d.wilson@healthlink.org",
    phone: "+1 (555) 777-8888",
    status: "Warm",
    funnel_stage: "lead",
    tags: "Healthcare, Compliance",
    notes: "HIPAA compliance is a deal-breaker.",
    created_at: "2024-03-20T10:10:00Z"
  },
  {
    id: 10,
    name: "Amara Okafor",
    email: "amara@lagos-ventures.com",
    phone: "+234 803 123 4567",
    status: "Active",
    funnel_stage: "client",
    tags: "Africa, VC",
    notes: "Partnering for regional distribution.",
    created_at: "2024-03-08T13:40:00Z"
  },
  {
    id: 11,
    name: "Lucas Muller",
    email: "l.muller@automotive.de",
    phone: "+49 30 123456",
    status: "Active",
    funnel_stage: "lead",
    tags: "Automotive, Germany",
    notes: "Interested in real-time supply chain tracking.",
    created_at: "2024-03-21T09:25:00Z"
  },
  {
    id: 12,
    name: "Chloe Thompson",
    email: "chloe@creative-agency.com",
    phone: "+1 (555) 333-4444",
    status: "Warm",
    funnel_stage: "following_up",
    tags: "Marketing, Agency",
    notes: "Wants to white-label the dashboard.",
    created_at: "2024-03-18T15:55:00Z"
  },
  {
    id: 13,
    name: "Mateo Garcia",
    email: "mateo@latam-logistics.com",
    phone: "+52 55 1234 5678",
    status: "Active",
    funnel_stage: "client",
    tags: "Logistics, Mexico",
    notes: "Happy with the current implementation.",
    created_at: "2024-02-28T11:15:00Z"
  },
  {
    id: 14,
    name: "Sarah Jenkins",
    email: "sjenkin@edu-tech.edu",
    phone: "+1 (555) 666-7777",
    status: "Cold",
    funnel_stage: "lead",
    tags: "Education",
    notes: "Budget approval pending for Q3.",
    created_at: "2024-03-12T14:00:00Z"
  },
  {
    id: 15,
    name: "Ahmed Al-Farsi",
    email: "ahmed@energy-solutions.ae",
    phone: "+971 4 123 4567",
    status: "Active",
    funnel_stage: "following_up",
    tags: "Energy, Middle East",
    notes: "Requires Arabic localization.",
    created_at: "2024-03-19T08:45:00Z"
  },
  {
    id: 16,
    name: "Olivia Brown",
    email: "olivia@fashion-forward.uk",
    phone: "+44 20 7123 4567",
    status: "Active",
    funnel_stage: "lead",
    tags: "Retail, UK",
    notes: "Potential for global rollout.",
    created_at: "2024-03-22T10:30:00Z"
  },
  {
    id: 17,
    name: "Noah Kim",
    email: "noah.kim@seoul-semicon.kr",
    phone: "+82 2-1234-5678",
    status: "Warm",
    funnel_stage: "following_up",
    tags: "Hardware, Korea",
    notes: "Comparing with Salesforce and HubSpot.",
    created_at: "2024-03-20T17:20:00Z"
  },
  {
    id: 18,
    name: "Emma Wilson",
    email: "emma.w@green-energy.ca",
    phone: "+1 (555) 999-0000",
    status: "Active",
    funnel_stage: "client",
    tags: "Sustainability, Canada",
    notes: "Renewed annual contract.",
    created_at: "2024-01-15T09:00:00Z"
  },
  {
    id: 19,
    name: "Gabriel Silva",
    email: "gabriel@brasil-telecom.br",
    phone: "+55 11 91234-5678",
    status: "Active",
    funnel_stage: "lead",
    tags: "Telecom, Brazil",
    notes: "Interested in the mobile app features.",
    created_at: "2024-03-23T11:00:00Z"
  },
  {
    id: 20,
    name: "Zara Ahmed",
    email: "zara@cloud-services.in",
    phone: "+91 80 1234 5678",
    status: "Warm",
    funnel_stage: "following_up",
    tags: "Cloud, India",
    notes: "Scaling their infrastructure rapidly.",
    created_at: "2024-03-22T16:00:00Z"
  }
];
