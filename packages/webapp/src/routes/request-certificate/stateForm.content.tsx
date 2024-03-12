import { TabsContent } from '@sb/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks';

import { RoutesConfig } from '../../config/routes';

const StateFormContent = () => {
  const generateLocalePath = useGenerateLocalePath();
  return (
    <TabsContent value={generateLocalePath(RoutesConfig.requestCertificate.state)}>
      <div></div>
    </TabsContent>
  );
};

export default StateFormContent;
