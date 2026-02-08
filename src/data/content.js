export const promptLabel = 'aditya@portfolio:~$'

export const sections = ['about', 'projects', 'skills', 'experience', 'blog', 'resume', 'contact']

export const about = {
  name: 'Aditya Dinesh Rajput',
  tagline: 'ECE Student | Embedded Systems | Web Development',
  bio: [
    'Aspiring engineer with a passion for embedded systems, the web and computers in general.',
    'Driven by curiosity and hands-on problem solving to bridge hardware and software.',
    'Constantly experimenting with new technologies to build functional, impactful systems.',
  ],
}

export const projects = [
  {
    title: 'Self Balancing Bot (Simulation)',
    slug: 'self-balancing-bot',
    description: 'Built a CoppeliaSim simulation for a self-balancing robot with a tuned PID controller.',
    stack: ['CoppeliaSim', 'Python', 'PID Control'],
    field: 'Embedded / Control',
    github: 'https://github.com/Aadecoder',
  },
  {
    title: 'STM32F411 Device Drivers',
    slug: 'stm32-device-drivers',
    description: 'Bare-metal GPIO, SPI, I2C, and UART drivers for the STM32F411, written from scratch.',
    stack: ['Embedded C', 'STM32CubeIDE'],
    field: 'Embedded / Drivers',
    github: 'https://github.com/Aadecoder/STM32F411xx-Drivers',
  },
  {
    title: 'Chess Advisor',
    slug: 'chess-advisor',
    description: 'YOLO-powered board detection paired with Stockfish to recommend the best chess moves.',
    stack: ['Python', 'YOLO', 'Stockfish', 'Machine Learning'],
    field: 'Machine Learning / Vision',
    github: 'https://github.com/Aadecoder/Chess_Advisor',
  },
  {
    title: 'VCG Signal Compression',
    slug: 'vcg-signal-compression',
    description: 'CNN–LSTM autoencoder that compresses and reconstructs VCG signals.',
    stack: ['Python, TensorFlow', 'Signal Processing', 'Machine Learning'],
    field: 'Machine Learning / Signal',
    github: 'https://github.com/Aadecoder/vcg-compression-ml',
  },
]

export const skills = {
  Languages: ['C', 'C++', 'Python', 'JavaScript'],
  Technologies: ['Microcontroller Programming', 'Bare-metal Development', 'RTOS', 'React', 'Tailwind CSS', 'Machine Learning', 'Neural Networks'],
  Tools: ['NeoVim', 'VS Code', 'Linux', 'Git', 'STM32CubeIDE', 'MongoDB', 'Figma'],
}

export const experiences = [
  {
    title: 'Core Committee Member at Electronics and Robotics Society IIITDMJ',
    period: '2025 — Present',
    summary: 'Working with like minded peers with a interest in Electronics and Robotics to build stuff.',
  }
]

export const blogPosts = [
  {
    title: 'Bare Metal in Arduino',
    slug: 'bare-metal-arduino',
    summary: 'blinky hard mode',
    file: './blogs/bare-metal-arduino.md',
  }
]

export const contact = [
  { label: 'Email', value: 'adityandr8274@gmail.com', href: 'mailto:adityandr8274@gmail.com' },
  { label: 'GitHub', value: 'Aadecoder', href: 'https://github.com/Aadecoder' },
  { label: 'LinkedIn', value: 'aditya-rajput-70372930a', href: 'https://www.linkedin.com/in/aditya-rajput-70372930a' },
  { label: 'X (Twitter)', value: 'aadi_rajputr', href: 'https://x.com/aadi_rajputr' },
  { label: 'Instagram', value: 'aaditya_rajputr', href: 'https://instagram.com/aaditya_rajputr' },
]

export const resumeLink = './Aditya_Rajput_Resume.pdf'
