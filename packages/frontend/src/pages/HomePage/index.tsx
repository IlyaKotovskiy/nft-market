import { Banner } from "@/components/blocks/Banner";
import { Categories } from "@/components/blocks/Categories";
import { Hero } from "@/components/blocks/Hero";

export const HomePage: React.FC = (): React.JSX.Element => {
    return (
        <>
            <Hero />
            <Banner />
            <Categories />
        </>
    )
};