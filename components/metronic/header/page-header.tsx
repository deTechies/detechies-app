interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <header>
            <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <div className="text-text-secondary text-sm font-medium">{subtitle}</div>
                </div>
                {children}
            </div>
        </header>
    );
};

export default PageHeader;