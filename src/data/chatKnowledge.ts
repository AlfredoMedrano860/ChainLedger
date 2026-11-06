/**
 * @file Base de conocimiento del chatbot Blocky.
 *
 * Cada entrada tiene palabras clave y una respuesta corta en inglés sencillo, basada
 * en el contenido del sitio y en los borradores del proyecto. El chatbot elige la
 * entrada cuyas palabras clave aparecen en la pregunta (ver `lib/chatbot.ts`).
 *
 * Para agregar una pregunta nueva: añade una entrada con un `id` único, sus palabras
 * clave en minúsculas y sin tildes (pueden ser frases; las frases largas pesan más)
 * y la respuesta. Se aceptan algunas palabras en español para quien pregunte así.
 */

/** Enlace que acompaña una respuesta para leer más. */
export interface ChatLink {
  /** Destino dentro de la página, por ejemplo `#concept` o `#term-hash`. */
  href: string
  /** Texto del enlace. */
  label: string
}

/** Una respuesta del chatbot. */
export interface ChatEntry {
  /** Identificador único. */
  id: string
  /** Palabras o frases que activan esta respuesta. */
  keywords: string[]
  /** Respuesta en inglés sencillo. */
  answer: string
  /** Enlace opcional a la sección donde se explica más. */
  link?: ChatLink
}

/**
 * Todas las respuestas. Si dos entradas empatan, gana la que está primero; por eso el
 * saludo y el agradecimiento van al final ("hi, what is a hash?" responde sobre hash).
 */
export const CHAT_KNOWLEDGE: ChatEntry[] = [



  {
    id: 'blockchain',
    keywords: ['blockchain', 'what is a blockchain', 'define blockchain', 'que es blockchain', 'cadena de bloques'],
    answer:
      'A blockchain is a digital ledger, or record book, that saves information in groups called blocks. Each block has some records, the date, and a hash. It also saves the hash of the block before it, so all the blocks form a chain.',
    link: { href: '#concept', label: '02 Concept' },
  },
  {
    id: 'block',
    keywords: ['block', 'what is a block', 'bloque'],
    answer: 'A block is a group of records saved together in a blockchain. It also has the date and a special code called a hash.',
    link: { href: '#term-block', label: 'Glossary: Block' },
  },
  {
    id: 'hash',
    keywords: ['hash', 'fingerprint', 'huella'],
    answer:
      'A hash is a short code that works like a fingerprint of a block. If the information inside the block changes, the hash changes too. That is how people notice a secret change.',
    link: { href: '#term-hash', label: 'Glossary: Hash' },
  },
  {
    id: 'node',
    keywords: ['node', 'nodes', 'nodo'],
    answer:
      'A node is a computer that keeps a copy of the blockchain. Many nodes have the same copy, like a notebook that many people share. If one copy changes, it no longer matches the others.',
    link: { href: '#term-node', label: 'Glossary: Node' },
  },
  {
    id: 'ledger',
    keywords: ['ledger', 'record book', 'libro contable'],
    answer: 'A ledger is a book or file where a company writes its records. A blockchain is a digital ledger.',
    link: { href: '#term-ledger', label: 'Glossary: Ledger' },
  },
  {
    id: 'private',
    keywords: ['private blockchain', 'private', 'privada', 'blockchain privada'],
    answer:
      'In a private blockchain, one organization or a group decides who can read the records and who can add new ones. Only people with permission can join. Companies use it to protect valuable data.',
    link: { href: '#term-private-blockchain', label: 'Glossary: Private blockchain' },
  },
  {
    id: 'public',
    keywords: ['public blockchain', 'public', 'publica', 'blockchain publica'],
    answer: 'A public blockchain is open to anyone who wants to be part of the system, like Bitcoin. Nobody in particular controls it.',
    link: { href: '#term-public-blockchain', label: 'Glossary: Public blockchain' },
  },
  {
    id: 'difference',
    keywords: ['difference', 'different', 'vs', 'versus', 'compare', 'public and private', 'private and public', 'diferencia'],
    answer:
      'Public: anyone can join, nobody in particular controls it, it is slower, and it is used for cryptocurrencies. Private: only people with permission can join, one organization or a group controls it, it is faster, and it is used for company records.',
    link: { href: '#concept', label: '02 Concept' },
  },
  {
    id: 'bitcoin',
    keywords: ['bitcoin', 'same as bitcoin', 'cryptocurrency', 'cryptocurrencies', 'crypto', 'criptomoneda'],
    answer:
      'No, it is not the same. Bitcoin uses a public blockchain, where anyone can join. Companies use private blockchains to protect their own records, like audits and inventory.',
    link: { href: '#introduction', label: '01 Introduction' },
  },
  {
    id: 'who-can-see',
    keywords: ['who can see', 'who can read', 'who has access', 'access', 'quien puede ver'],
    answer: 'In a private blockchain, only the people and companies that the organization gives permission to can read or add information.',
    link: { href: '#term-permission', label: 'Glossary: Permission' },
  },
  {
    id: 'permission',
    keywords: ['permission', 'permissions', 'permiso'],
    answer: 'A permission is the right to read or add information in a private blockchain. The company decides who gets it.',
    link: { href: '#term-permission', label: 'Glossary: Permission' },
  },
  {
    id: 'change',
    keywords: ['change', 'delete', 'edit', 'modify', 'tamper', 'secret', 'hack', 'cambiar', 'borrar'],
    answer:
      'Not in secret. Every record is connected to the one before it. If someone changes a record, its hash changes, and the next block no longer matches, so everybody can see it. Try it in the inventory ledger at the top of the page.',
    link: { href: '#top', label: 'Try the ledger' },
  },
  {
    id: 'cost',
    keywords: ['expensive', 'cost', 'price', 'money', 'cheap', 'caro', 'costo'],
    answer:
      'It can be expensive. A company needs servers, nodes, and trained workers, so it usually costs more than a normal database. Each company must decide if it really needs it.',
    link: { href: '#benefits', label: '05 Benefits & Limitations' },
  },
  {
    id: 'small-business',
    keywords: ['small business', 'small company', 'small shop', 'local business', 'pequena empresa'],
    answer:
      'Not always. A private blockchain is most useful when many partners share records and need to trust them, like suppliers, transport companies, and stores. A small local business can often use a normal database.',
    link: { href: '#benefits', label: '05 Benefits & Limitations' },
  },
  {
    id: 'auditing',
    keywords: ['auditing', 'audit', 'auditor', 'auditors', 'auditoria'],
    answer:
      'Auditing is the review of a company’s records to check that they are correct and honest. With a private blockchain, every record has a date and an author, and nobody can change it in secret, so auditors can check the information faster and trust it more.',
    link: { href: '#development', label: '03 Development' },
  },
  {
    id: 'inventory',
    keywords: ['inventory', 'stock', 'warehouse', 'product', 'products', 'package', 'inventario'],
    answer:
      'For inventory, each movement of a product, like arrival, storage, or sale, is saved as a new record. The company knows where every product is and where it came from.',
    link: { href: '#development', label: '03 Development' },
  },
  {
    id: 'how-companies-use',
    keywords: ['how do companies use', 'how companies use', 'use it', 'companies', 'company', 'business use', 'empresas'],
    answer:
      'Companies use a private blockchain to keep their data safe and hard to change. Every movement is connected to the previous one, so workers in the network can notice if someone changes the data. It is very useful for auditing and inventory control.',
    link: { href: '#development', label: '03 Development' },
  },
  {
    id: 'database',
    keywords: ['database', 'normal database', 'sql', 'excel', 'base de datos'],
    answer:
      'In a normal database, an administrator can change or delete a record without a trace. In a blockchain, records are connected and copied in many nodes, so changes are easy to see. But a blockchain costs more and is harder to set up.',
    link: { href: '#benefits', label: '05 Benefits & Limitations' },
  },
  {
    id: 'walmart',
    keywords: ['walmart', 'ibm', 'food trust', 'mango', 'mangoes', 'example', 'real case', 'ejemplo'],
    answer:
      'Walmart wanted to find the farm of a package of sliced mangoes. With phone calls, emails, and paper, it took almost seven days. With a private blockchain made with IBM (later called IBM Food Trust), they traced it in only 2.2 seconds.',
    link: { href: '#example', label: '04 Example' },
  },
  {
    id: 'traceability',
    keywords: ['traceability', 'trace', 'tracking', 'track', 'origin', 'trazabilidad'],
    answer:
      'Traceability is the ability to follow the history of a product from its origin to its present location. A private blockchain gives each product a clear history.',
    link: { href: '#term-traceability', label: 'Glossary: Traceability' },
  },
  {
    id: 'benefits',
    keywords: ['benefit', 'benefits', 'advantage', 'advantages', 'good', 'why use', 'ventajas', 'beneficios'],
    answer:
      'The main benefits are: the information is safer, records cannot be changed in secret, mistakes are easier to find, and the history of each record is easy to trace.',
    link: { href: '#benefits', label: '05 Benefits & Limitations' },
  },
  {
    id: 'limitations',
    keywords: ['limitation', 'limitations', 'disadvantage', 'disadvantages', 'problem', 'problems', 'bad', 'desventajas', 'limitaciones'],
    answer:
      'It can be expensive, it uses more resources than a normal database, and it is difficult to understand for many people. Also, a blockchain protects the records, but it cannot check if the first record is true.',
    link: { href: '#benefits', label: '05 Benefits & Limitations' },
  },
  {
    id: 'about',
    keywords: ['this site', 'who made', 'authors', 'author', 'course', 'project', 'university', 'ucr', 'quien hizo'],
    answer:
      'This site was made by Didier Aarón Mayorga Hernández and José Alfredo Medrano Saravia for the course TM-6300 Grammar and Composition I at the Universidad de Costa Rica.',
    link: { href: '#contact', label: '08 Contact' },
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'write', 'question for the authors', 'correo', 'contacto'],
    answer: 'You can write to the authors at mc.alfredomedra@gmail.com, or use the form in the Contact section.',
    link: { href: '#contact', label: '08 Contact' },
  },
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'hola', 'buenas'],
    answer: "Hi! I'm Blocky. Ask me anything about private blockchain, auditing, or inventory control.",
  },  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'gracias'],
    answer: "You're welcome! If you have another question, I'm here.",
  },  {
    id: 'mascot',
    keywords: ['who are you', 'your name', 'what are you', 'blocky', 'quien eres'],
    answer: "I'm Blocky, a block of the ChainLedger chain. I answer questions with the information on this site.",
  },]

/** Preguntas sugeridas que se muestran como botones. */
export const SUGGESTIONS = [
  'What is a blockchain?',
  'Is it the same as Bitcoin?',
  'Can someone change a record?',
  'How does it help auditors?',
  'What happened with Walmart?',
]
