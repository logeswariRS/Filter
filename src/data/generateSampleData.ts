import { Employee } from '../types';

/**
 * Generates a comprehensive dataset of employee records
 * Creates at least 50 records with varied data for testing filters
 */
export function generateSampleData(): Employee[] {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product', 'Design'];
  const roles = [
    'Senior Developer', 'Junior Developer', 'Lead Developer', 'Product Manager', 
    'Marketing Manager', 'Sales Representative', 'HR Specialist', 'Financial Analyst',
    'Operations Manager', 'Designer', 'QA Engineer', 'DevOps Engineer', 'Data Analyst'
  ];
  const cities = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston', 'Chicago', 'Los Angeles', 'Denver', 'Atlanta', 'Raleigh'];
  const states = ['CA', 'NY', 'TX', 'WA', 'MA', 'IL', 'CA', 'CO', 'GA', 'NC'];
  const countries = ['USA'];
  const allSkills = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis'];
  
  const employees: Employee[] = [];
  
  const names = [
    'John Smith', 'Jane Doe', 'Michael Johnson', 'Emily Davis', 'David Wilson',
    'Sarah Brown', 'Robert Taylor', 'Jessica Martinez', 'William Anderson', 'Ashley Thomas',
    'James Jackson', 'Amanda White', 'Christopher Harris', 'Melissa Martin', 'Daniel Thompson',
    'Michelle Garcia', 'Matthew Martinez', 'Stephanie Robinson', 'Andrew Clark', 'Nicole Rodriguez',
    'Joshua Lewis', 'Rebecca Lee', 'Ryan Walker', 'Lauren Hall', 'Kevin Allen',
    'Samantha Young', 'Brandon King', 'Rachel Wright', 'Justin Lopez', 'Megan Hill',
    'Tyler Scott', 'Brittany Green', 'Jordan Adams', 'Kayla Baker', 'Nathan Gonzalez',
    'Amber Nelson', 'Zachary Carter', 'Heather Mitchell', 'Cody Perez', 'Jasmine Roberts',
    'Austin Turner', 'Katherine Phillips', 'Logan Campbell', 'Christina Parker', 'Ethan Evans',
    'Victoria Edwards', 'Connor Collins', 'Stephanie Stewart', 'Noah Sanchez', 'Brianna Morris',
    'Lucas Rogers', 'Danielle Reed', 'Mason Cook', 'Alexis Morgan', 'Ethan Bell',
    'Madison Murphy', 'Aiden Bailey', 'Sophia Rivera', 'Carter Cooper', 'Olivia Richardson',
    'Liam Cox', 'Emma Howard', 'Noah Ward', 'Ava Torres', 'Mason Peterson',
    'Isabella Gray', 'Lucas Ramirez', 'Mia James', 'Alexander Watson', 'Charlotte Brooks',
    'Benjamin Kelly', 'Harper Sanders', 'William Price', 'Amelia Bennett', 'Henry Wood',
    'Evelyn Barnes', 'Sebastian Ross', 'Abigail Henderson', 'Jack Coleman', 'Emily Jenkins',
    'Owen Perry', 'Elizabeth Powell', 'Wyatt Long', 'Sofia Patterson', 'Grayson Hughes',
    'Avery Flores', 'Leo Washington', 'Scarlett Butler', 'Julian Simmons', 'Victoria Foster'
  ];
  
  // Generate 60 employees for comprehensive testing
  for (let i = 0; i < 60; i++) {
    const name = names[i % names.length];
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`;
    const department = departments[Math.floor(Math.random() * departments.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const salary = Math.floor(Math.random() * 100000) + 50000; // 50k - 150k
    const cityIndex = Math.floor(Math.random() * cities.length);
    const city = cities[cityIndex];
    const state = states[cityIndex];
    const country = countries[0];
    
    // Generate join date between 2019 and 2024
    const joinYear = 2019 + Math.floor(Math.random() * 6);
    const joinMonth = Math.floor(Math.random() * 12) + 1;
    const joinDay = Math.floor(Math.random() * 28) + 1;
    const joinDate = `${joinYear}-${String(joinMonth).padStart(2, '0')}-${String(joinDay).padStart(2, '0')}`;
    
    // Generate last review date (within last 2 years)
    const reviewYear = 2022 + Math.floor(Math.random() * 3);
    const reviewMonth = Math.floor(Math.random() * 12) + 1;
    const reviewDay = Math.floor(Math.random() * 28) + 1;
    const lastReview = `${reviewYear}-${String(reviewMonth).padStart(2, '0')}-${String(reviewDay).padStart(2, '0')}`;
    
    const isActive = Math.random() > 0.2; // 80% active
    const projects = Math.floor(Math.random() * 10) + 1; // 1-10 projects
    const performanceRating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 - 5.0
    
    // Select 2-5 random skills
    const numSkills = Math.floor(Math.random() * 4) + 2;
    const shuffledSkills = [...allSkills].sort(() => Math.random() - 0.5);
    const skills = shuffledSkills.slice(0, numSkills);
    
    employees.push({
      id: i + 1,
      name,
      email,
      department,
      role,
      salary,
      joinDate,
      isActive,
      skills,
      address: {
        city,
        state,
        country,
      },
      projects,
      lastReview,
      performanceRating,
    });
  }
  
  return employees;
}




