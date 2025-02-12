// Вызывается командой: yarn generate:component your_path your_component_name
// Дефолтный путь создания компонента: *root_directory*/packages/frontend/src/components

// Пришлось задействовать IIFE так, как используется динамический импорт библиотеки Ora, которая является ES-модулем

(async () => {
    const fs = require("fs");
    const path = require("path");
    const ora = await import("ora").then(mod => mod.default);

    const componentPath = process.argv[2];
    const componentName = process.argv[3];

    if (!componentName || !componentPath) {
        console.error("❌  Specify the component path and the component name!");
        process.exit(1);
    }

    const componentDir = path.join(__dirname, "packages/frontend/src/components", componentPath, componentName);
    const componentFile = path.join(componentDir, "index.tsx");
    const stylesFile = path.join(componentDir, `${componentName}.module.scss`);
    const componentTemplate = `import s from './${componentName}.module.scss';

export const ${componentName}: React.FC = (): React.JSX.Element => {
    return (
        <div>${componentName}</div>
    )
};`

    const spinner = ora(`  Creating component "${componentName}"...`).start();

    setTimeout(() => {
        try {
            if (!fs.existsSync(componentDir)) {
                fs.mkdirSync(componentDir, { recursive: true });
            }

            fs.writeFileSync(componentFile, componentTemplate);
            fs.writeFileSync(stylesFile, '');

            spinner.succeed(`  The "${componentName}" component was created on ${componentDir}`);
        } catch (error) {
            spinner.fail(`  Error creating component: ${error.message}`)
        }
    }, 1000)
})();