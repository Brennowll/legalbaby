import { TabsContent } from '@sb/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks';

import { RoutesConfig } from '../../config/routes';
import { StateForm } from '../../shared/components/certificates/stateForm/stateForm.component';

const StateFormContent = () => {
  const generateLocalePath = useGenerateLocalePath();
  return (
    <TabsContent value={generateLocalePath(RoutesConfig.requestCertificate.state)} className="py-8">
      <StateForm />
    </TabsContent>
  );
};

export default StateFormContent;
