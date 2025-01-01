"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps {
	placeholder?: string;
}

export function DataTableSearch({
	placeholder = "Search...",
}: DataTableSearchProps) {
	const [query, setQuery] = useQueryState("q");
	const [value, setValue] = useState(query || "");
	const [debouncedValue] = useDebounce(value, 100);

	useEffect(() => {
		if (debouncedValue === "") {
			setQuery(null);
		} else {
			setQuery(debouncedValue);
		}
	}, [debouncedValue, setQuery]);

	const handleClear = () => {
		setValue("");
		setQuery(null);
	};

	return (
		<div className="w-1/4">
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="max-w-sm"
			/>
			{value && (
				<Button
					variant="ghost"
					onClick={handleClear}
					className="h-full px-3 py-2 hover:bg-transparent"
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Clear search</span>
				</Button>
			)}
		</div>
	);
}
