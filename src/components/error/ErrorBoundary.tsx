import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className="error-card">
                        <h2 style={{ color: 'var(--color-danger)', marginTop: 0 }}>うっ...エラーです 🥺</h2>
                        <p>ごめんなさい、何かうまくいきませんでした。</p>

                        <div style={{
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            padding: '10px',
                            borderRadius: '8px',
                            margin: '20px 0',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            overflowX: 'auto'
                        }}>
                            {this.state.error?.message}
                        </div>

                        <Button onClick={() => window.location.reload()}>
                            再読み込み 🔄
                        </Button>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
