import PostList from "@/components/PostList";
import { TestAlert } from "./topshowcomponents/TestAlert";

export const FifthGrid = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>BANNER</div>
            <div className="grow">
                <PostList />
            </div>
            <div className="flex gap-4">
                <div>
                    <TestAlert />
                </div>
                <div>Top Components</div>
            </div>
        </div>
    );
};