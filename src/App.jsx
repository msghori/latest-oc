import React from 'react'
import OrgChart from './components/OrgChart'

function App() {
  // Data with 15 employees
  const data = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      position: "CEO",
      department: "Executive",
      email: "sarah.j@company.com",
      phone: "+1 234-567-8900",
      image: "https://i.pravatar.cc/150?img=1",
      parentId: null 
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      position: "CTO",
      department: "Technology",
      email: "michael.c@company.com",
      phone: "+1 234-567-8901",
      image: "https://i.pravatar.cc/150?img=12",
      parentId: 1 
    },
    { 
      id: 3, 
      name: "Emily Davis", 
      position: "CFO",
      department: "Finance",
      email: "emily.d@company.com",
      phone: "+1 234-567-8902",
      image: "https://i.pravatar.cc/150?img=5",
      parentId: 1 
    },
    { 
      id: 4, 
      name: "Robert Wilson", 
      position: "COO",
      department: "Operations",
      email: "robert.w@company.com",
      phone: "+1 234-567-8903",
      image: "https://i.pravatar.cc/150?img=15",
      parentId: 1 
    },
    { 
      id: 5, 
      name: "David Martinez", 
      position: "Frontend Lead",
      department: "Engineering",
      email: "david.m@company.com",
      phone: "+1 234-567-8904",
      image: "https://i.pravatar.cc/150?img=13",
      parentId: 2 
    },
    { 
      id: 6, 
      name: "Lisa Anderson", 
      position: "Backend Lead",
      department: "Engineering",
      email: "lisa.a@company.com",
      phone: "+1 234-567-8905",
      image: "https://i.pravatar.cc/150?img=9",
      parentId: 2 
    },
    { 
      id: 7, 
      name: "James Taylor", 
      position: "DevOps Lead",
      department: "Engineering",
      email: "james.t@company.com",
      phone: "+1 234-567-8906",
      image: "https://i.pravatar.cc/150?img=33",
      parentId: 2 
    },
    { 
      id: 8, 
      name: "Jessica Brown", 
      position: "Senior Accountant",
      department: "Finance",
      email: "jessica.b@company.com",
      phone: "+1 234-567-8907",
      image: "https://i.pravatar.cc/150?img=20",
      parentId: 3 
    },
    { 
      id: 9, 
      name: "Daniel Lee", 
      position: "Financial Analyst",
      department: "Finance",
      email: "daniel.l@company.com",
      phone: "+1 234-567-8908",
      image: "https://i.pravatar.cc/150?img=14",
      parentId: 3 
    },
    { 
      id: 10, 
      name: "Amanda White", 
      position: "Operations Manager",
      department: "Operations",
      email: "amanda.w@company.com",
      phone: "+1 234-567-8909",
      image: "https://i.pravatar.cc/150?img=32",
      parentId: 4 
    },
    { 
      id: 11, 
      name: "Chris Garcia", 
      position: "UI/UX Designer",
      department: "Engineering",
      email: "chris.g@company.com",
      phone: "+1 234-567-8910",
      image: "https://i.pravatar.cc/150?img=17",
      parentId: 5 
    },
    { 
      id: 12, 
      name: "Sophia Rodriguez", 
      position: "React Developer",
      department: "Engineering",
      email: "sophia.r@company.com",
      phone: "+1 234-567-8911",
      image: "https://i.pravatar.cc/150?img=44",
      parentId: 5 
    },
    { 
      id: 13, 
      name: "Kevin Thompson", 
      position: "Node.js Developer",
      department: "Engineering",
      email: "kevin.t@company.com",
      phone: "+1 234-567-8912",
      image: "https://i.pravatar.cc/150?img=51",
      parentId: 6 
    },
    { 
      id: 14, 
      name: "Rachel Martinez", 
      position: "Database Admin",
      department: "Engineering",
      email: "rachel.m@company.com",
      phone: "+1 234-567-8913",
      image: "https://i.pravatar.cc/150?img=47",
      parentId: 6 
    },
    { 
      id: 15, 
      name: "Brian Clark", 
      position: "Cloud Engineer",
      department: "Engineering",
      email: "brian.c@company.com",
      phone: "+1 234-567-8914",
      image: "https://i.pravatar.cc/150?img=60",
      parentId: 7 
    }
  ];

  return (
    <div className="App" style={{ width: '100%', height: '100%' }}>
      <OrgChart data={data} />
    </div>
  )
}

export default App
