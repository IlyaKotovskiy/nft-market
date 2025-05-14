import { faker } from '@faker-js/faker';

type NFT = {
    id: string;
    name: string;
    description: string;
    image: string;
    attributes: {
        trait_type: string;
        value: string;
    }[];
};

type NFTCollection = {
    id: string;
    name: string;
    description: string;
    category: string;
    logo: string;
    banner: string;
    nfts: NFT[];
    createdAt: Date;
};

const CATEGORIES = [
    'art',
    'music',
    'sports',
    'photography',
    'trading',
    'collectibles',
    'utility'
] as const;

type ArtShape = 'square' | 'rectangle'; // rectangle теперь будет горизонтальным
type ArtType = 'banner' | 'logo' | 'nft';

interface ArtOptions {
    shape?: ArtShape;
    type: ArtType;
    palette?: string[];
    aspectRatio?: number; // Добавим параметр для кастомного соотношения
}

const generatePixelArt = (seed: string, options: ArtOptions): string => {
    const {
        shape = 'square',
        type,
        palette = ['#3a0ca3', '#4361ee', '#4cc9f0', '#f72585', '#7209b7'],
        aspectRatio = 1.8
    } = options;

    // Генерация стабильного хэша
    const hash = Array.from(seed).reduce((acc, char, idx) =>
        acc + char.charCodeAt(0) * (idx + 1) * 2654435761, 0);

    // Размеры изображения
    const baseSize = {
        banner: 800,
        logo: 200,
        nft: 400
    }[type];

    const width = shape === 'rectangle' ? Math.round(baseSize * aspectRatio) : baseSize;
    const height = baseSize;

    // Создаем простой SVG с видимыми элементами
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" 
      width="${width}" height="${height}" 
      viewBox="0 0 ${width} ${height}"
      style="background-color:#f0f0f0">`; // Фон для видимости

    // Добавляем четко видимые элементы
    const elementsCount = 50; // Фиксированное количество элементов

    for (let i = 0; i < elementsCount; i++) {
        const x = (hash + i * 13) % width;
        const y = (hash + i * 17) % height;
        const size = 20 + (hash % 50);
        const color = palette[(hash + i) % palette.length];

        svg += `<rect 
        x="${x}" y="${y}" 
        width="${size}" height="${size}" 
        fill="${color}" 
        opacity="0.8"
        stroke="#000" 
        stroke-width="1"
      />`;
    }

    svg += `</svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const generateNFT = (): NFT => {
    const id = faker.string.uuid(); // Генерируем уникальный ID для NFT

    return {
        id,
        name: `${faker.word.adjective()} ${faker.word.noun()}`,
        description: faker.lorem.sentence(),
        image: generatePixelArt('nft-' + Math.random(), {
            type: 'nft'
        }), // Используем ID NFT как seed
        attributes: [
            { trait_type: 'Rarity', value: `${faker.number.int({ min: 1, max: 5 })}/5` },
            { trait_type: 'Background', value: faker.color.human() },
            { trait_type: 'Type', value: faker.word.noun() }
        ]
    };
};

const generateCollection = (): NFTCollection => {
    const id = faker.string.uuid();
    const nftsCount = faker.number.int({ min: 10, max: 100 });

    return {
        id,
        name: `${faker.word.adjective()} ${faker.word.noun()} Collection`,
        description: faker.lorem.paragraph(),
        category: faker.helpers.arrayElement(CATEGORIES),
        logo: generatePixelArt('company-logo', {
            type: 'logo',
            shape: 'square',
            palette: ['#000000', '#ffffff', '#ff0000']
        }),
        banner: generatePixelArt('main-banner', {
            type: 'banner',
            shape: 'rectangle'
        }),
        nfts: Array.from({ length: nftsCount }, () => generateNFT()), // Убираем передачу collectionId
        createdAt: faker.date.past()
    };
};

export const generateMockCollections = (count: number): NFTCollection[] => {
    return Array.from({ length: count }, generateCollection);
};

export const MOCK_COLLECTIONS = generateMockCollections(50);