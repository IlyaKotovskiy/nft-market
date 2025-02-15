import { Banner } from "@/components/blocks/Banner";
import { Categories } from "@/components/blocks/Categories";
import { Drops } from "@/components/blocks/Drops";
import { Hero } from "@/components/blocks/Hero";
import { Sponsors } from "@/components/blocks/Sponsors";

export const HomePage: React.FC = (): React.JSX.Element => {
    return (
        <>
            <Hero />
            <Banner />
            <Drops />
            <Categories />
            <Sponsors />
        </>
    )
};