import { Banner } from "@/components/blocks/Banner";
import { Categories } from "@/components/blocks/Categories";
import { Drops } from "@/components/blocks/Drops";
import { Hero } from "@/components/blocks/Hero";
import { Sponsors } from "@/components/blocks/Sponsors";
import { TopCollections } from "@/components/blocks/TopCollections";
import { memo } from "react";

export const HomePage: React.FC = memo((): React.JSX.Element => {
    return (
        <>
            <Hero />
            <Banner />
            <Drops />
            <TopCollections />
            <Categories />
            <Sponsors />
        </>
    )
});