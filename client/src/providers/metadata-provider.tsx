import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";

// React 19 feature: Better metadata handling
interface MetadataContextValue {
  title: string;
  description: string;
  setMetadata: (
    metadata: Partial<Pick<MetadataContextValue, "title" | "description">>
  ) => void;
}

const MetadataContext = createContext<MetadataContextValue | undefined>(
  undefined
);

interface MetadataProviderProps {
  readonly children: ReactNode;
  readonly defaultTitle?: string;
  readonly defaultDescription?: string;
}

export function MetadataProvider({
  children,
  defaultTitle = "Planora",
  defaultDescription = "Your activity planning hub",
}: MetadataProviderProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const setMetadata = useCallback(
    (
      newMetadata: Partial<Pick<MetadataContextValue, "title" | "description">>
    ) => {
      if (newMetadata.title !== undefined) {
        setTitle(newMetadata.title);
        document.title =
          newMetadata.title === defaultTitle
            ? defaultTitle
            : `${newMetadata.title} | ${defaultTitle}`;
      }

      if (newMetadata.description !== undefined) {
        setDescription(newMetadata.description);
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", newMetadata.description);
        }
      }
    },
    [defaultTitle]
  );

  const value: MetadataContextValue = useMemo(
    () => ({
      title,
      description,
      setMetadata,
    }),
    [title, description, setMetadata]
  );

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
}

// Hook for setting page metadata
export function usePageMetadata(title: string, description?: string) {
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({ title, description });

    // Cleanup function to reset to default
    return () => {
      setMetadata({
        title: "Planora",
        description: "Your activity planning hub",
      });
    };
  }, [title, description, setMetadata]);
}
