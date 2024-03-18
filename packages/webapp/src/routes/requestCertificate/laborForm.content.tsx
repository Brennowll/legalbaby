import { TabsContent } from '@sb/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks';

import { RoutesConfig } from '../../config/routes';
import { LaborForm } from '../../shared/components/certificates/laborForm/laborForm.component';

const LaborFormContent = () => {
  const generateLocalePath = useGenerateLocalePath();

  return (
    <TabsContent value={generateLocalePath(RoutesConfig.requestCertificate.labor)} className="py-8">
      <LaborForm />
    </TabsContent>
  );
};

export default LaborFormContent;
