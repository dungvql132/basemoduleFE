import React, { useEffect, useState } from "react";
import { Tabs, Spin, message, Card } from "antd";
import type { TabsProps } from "antd";
import axios from "axios";
import { Enviroment } from "@src/constants/eviroment";
import HabitCard from "./HabitCard";
import { Habit } from "../../interfaces/IHabit";

const HabitMainContent: React.FC = () => {
    const [types, setTypes] = useState<string[]>([]);
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState<string>();

    const BASE_URL = Enviroment.backendUrl;

    const fetchTypes = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/habit/type`);
            setTypes(res.data.data || []);
            if (res.data.data.length > 0) {
                setActiveKey(res.data.data[0]);
                fetchHabitsByType(res.data.data[0]);
            }
        } catch (error) {
            message.error("Failed to load habit types");
        }
    };

    const fetchHabitsByType = async (type: string) => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/habit`, { params: { type } });
            setHabits(res.data.data || []);
        } catch (error) {
            message.error("Failed to load habits");
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (key: string) => {
        setActiveKey(key);
        fetchHabitsByType(key);
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const items: TabsProps["items"] = types.map((type) => ({
        key: type,
        label: type,
        children: loading ? (
            <Spin />
        ) : (
            <>
                {habits.map((habit) => (
                    <HabitCard key={habit.id} habit={habit} refreshHabits={() => fetchHabitsByType(activeKey!)} />
                ))}
            </>
        ),
    }));

    return <Tabs items={items} activeKey={activeKey} onChange={handleTabChange} />;
};

export default HabitMainContent;
